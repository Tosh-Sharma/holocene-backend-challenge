export const formatResponse = (rowsCreated, rowsDeleted, rowsUpdated) => {
  const response = {
    rowsCreated: rowsCreated?.count || 0,
    rowsDeleted: rowsDeleted?.count || 0,
    rowsUpdated: rowsUpdated.length,
  };
  return response;
};
