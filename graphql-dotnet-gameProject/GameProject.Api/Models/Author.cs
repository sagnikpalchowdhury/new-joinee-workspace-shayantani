namespace GameProject.Api.Models;

public class Author
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public bool Verified { get; set; }
}