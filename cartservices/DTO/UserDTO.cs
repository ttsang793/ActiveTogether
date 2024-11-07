namespace cartservices.DTO;

public class UserLoginDTO
{
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;
}

public class UserRegisterDTO
{
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public string? Address { get; set; }
}

public class UserUpdateDTO
{
    public string? Old { get; set; }

    public string? New { get; set; }
}

public class UserUpdateInfoDTO
{
    public string? FullName { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }
}

public class UserAddressDTO
{
    public List<UserAddressListDTO> AddressList { get; set; } = new List<UserAddressListDTO>();
}

public class UserAddressListDTO
{
    public int UserId { get; set; }

    public string Type { get; set; } = null!;

    public string Address { get; set; } = null!;
}