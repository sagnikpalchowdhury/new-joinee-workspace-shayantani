namespace GameProject.Api.Models;

public class Review
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public int Rating { get; set; }
    public string Content { get; set; } = string.Empty;
    public string AuthorId { get; set; } = string.Empty;
    public string GameId { get; set; } = string.Empty;
}