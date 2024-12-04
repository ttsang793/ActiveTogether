using Core.Entity;

namespace Core.DTO;

public class AdminPageDTO : BaseDTO
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
public class LoginAdminDTO : BaseDTO
{
    public string? Name { get; set; }

    public int? Username { get; set; }

    public string? Avatar { get; set; }

    public int? Role { get; set; }

    public List<int>? PermissionGroup { get; set; }
}