namespace Core.DTO;

public class AdminUserDTO : BaseDTO {
  public int Id { get; set; }

  public string? FullName { get; set; }

  public string? RoleName { get; set; }
}

public class AdminLoginDTO : BaseDTO {
  public int Id { get; set; }

  public string? Password { get; set; }
}

public class RoleDTO : BaseDTO
{
    public int? Id { get; set; }

    public string? Name { get; set; }

    public int[]? PermissionIds { get; set; }
}