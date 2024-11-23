using Core.Entity;
using Core.DTO;

namespace Core.Interface;

public interface IImportRepository : IInsert<Import>, IInsert<ImportDetail>
{
  IEnumerable<ImportReadDTO> GetAllImports();

  IEnumerable<BillDetailAdminDTO> GetAllImportDetails();
}