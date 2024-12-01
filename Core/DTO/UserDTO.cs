namespace Core.DTO;

public class UserLoginDTO : BaseDTO
{
    public string Username { get; set; } = null!;
}

public class UserRegisterDTO : BaseDTO
{
    public string? FirebaseUid { get; set; } = null!;

    public string? Username { get; set; } = null!;

    public string? FullName { get; set; } = null!;

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public string? Address { get; set; }
}

public class UserUpdateDTO : BaseDTO
{
    public string? Old { get; set; }

    public string? New { get; set; }
}

public class UserUpdateInfoDTO : BaseDTO
{
    public string? FullName { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public string? Avatar { get; set; }
}

public class UserAddressListDTO : BaseDTO
{
    public List<UserAddressDTO> AddressList { get; set; } = new List<UserAddressDTO>();
}

public class UserAddressDTO : BaseDTO
{
    public int UserId { get; set; }

    public string Type { get; set; } = null!;

    public string Address { get; set; } = null!;
}

public class GoogleLoginDTO
{
    public string TempToken { get; set; }

    public string Email { get; set; }
}