namespace Core.DTO;

public class AdminLoginDTO : BaseDTO
{
    public int Id { get; set; }
}
public class AdminUserDTO : BaseDTO {
  public int Id { get; set; }

  public string? FullName { get; set; }

  public string? RoleName { get; set; }
}
public class AdminUserInsertDTO : BaseDTO
{
    public string? FullName { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public int? RoleId { get; set; }
}

public class RoleDTO : BaseDTO
{
    public int? Id { get; set; }

    public string? Name { get; set; }

    public int[]? PermissionIds { get; set; }
}