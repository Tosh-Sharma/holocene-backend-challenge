import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CREATE_MANY, DELETE_MANY, UPDATE } from 'src/constants/constants';
import { formatResponse } from 'src/helpers/responseFormatter';

import { InputDataLoadDto } from './dto/input-data-load.dto';

@Injectable()
export class LoadPlanV2Service {
  constructor(private readonly prisma: PrismaService) {}

  findAll = async () => {
    const response = await this.prisma.loadPlan.findMany();
    return response;
  };

  prismaHandler = (data, action: string, isArray: boolean) => {
    if (isArray && data.length === 0) {
      return null;
    }

    switch (action) {
      case CREATE_MANY: {
        return this.prisma.loadPlan.createMany({ data: data });
      }
      case DELETE_MANY: {
        return this.prisma.loadPlan.deleteMany({
          where: {
            id: { in: data },
          },
        });
      }
      case UPDATE: {
        return this.prisma.loadPlan.update({
          where: { id: data.id },
          data,
        });
      }
      default: {
        return null;
      }
    }
  };

  process = async (processData: InputDataLoadDto[]) => {
    const originalData = await this.findAll();
    const dataToCreate = processData.filter((row) => row.id === undefined); // This filters out all the rows to be created
    const rowsCreated = await this.prismaHandler(
      dataToCreate,
      CREATE_MANY,
      true,
    );
    const existingData = processData.filter((row) => row.id);
    const idsToDelete = originalData
      .filter((input) => !existingData.some((row) => row.id === input.id)) // This filters for rows that do not exist in
      .map((row) => row.id);
    const rowsDeleted = await this.prismaHandler(
      idsToDelete,
      DELETE_MANY,
      true,
    );
    const dataToUpdate = existingData.filter((row) => {
      const originalRow = originalData.find((input) => input.id === row.id);
      const keys = Object.keys(row);
      return keys.some((key) => row[key] !== originalRow[key]);
    });

    const updateOperations = [];
    if (dataToUpdate.length > 0) {
      dataToUpdate.forEach((row) =>
        updateOperations.push(this.prismaHandler(row, UPDATE, false)),
      );
    }
    const operationToExecute = updateOperations.filter(
      (operation) => operation !== null,
    );
    // This ensures either all update transactions happen at once or none at all.
    const rowsUpdated = await this.prisma.$transaction(operationToExecute);
    const res = formatResponse(rowsCreated, rowsDeleted, rowsUpdated);
    return res;
  };
}
