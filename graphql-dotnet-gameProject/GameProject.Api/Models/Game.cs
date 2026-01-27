namespace GameProject.Api.Models;

public class Game
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = string.Empty;
    public List<string> Platform { get; set; } = new List<string>();
}