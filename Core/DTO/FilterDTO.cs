namespace Core.DTO;

public class FilterDTO : BaseDTO
{
    public string? Id { get; set; }

    public string? Name { get; set; }
}

public class FilterListDTO : BaseDTO
{
    public string? Params { get; set; }

    public string? Title { get; set; }

    public FilterDTO[]? Details { get; set; }
}

public class SearchListDTO : BaseDTO
{
    public string? Param { get; set; }

    public string? DetailString { get; set; }

    public List<string>? DetailArray { get; set; }
}