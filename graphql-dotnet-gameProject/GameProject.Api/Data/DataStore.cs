using GameProject.Api.Models;

namespace GameProject.Api.Data;

public class DataStore
{
    public List<Game> Games { get; set; } = new()
    {
        new Game { Id = "1", Title = "Zelda, Tears of the Kingdom", Platform = new() { "Switch" } },
        new Game { Id = "2", Title = "Final Fantasy 7 Remake", Platform = new() { "PS5", "Xbox" } },
        new Game { Id = "3", Title = "Elden Ring", Platform = new() { "PS5", "Xbox", "PC" } },
        new Game { Id = "4", Title = "Mario Kart", Platform = new() { "Switch" } },
        new Game { Id = "5", Title = "Pokemon Scarlet", Platform = new() { "PS5", "Xbox", "PC" } },
    };

    public List<Author> Authors { get; set; } = new()
    {
        new Author { Id = "1", Name = "mario", Verified = true },
        new Author { Id = "2", Name = "yoshi", Verified = false },
        new Author { Id = "3", Name = "peach", Verified = true },
    };

    public List<Review> Reviews { get; set; } = new()
    {
        new Review { Id = "1", Rating = 9, Content = "lorem ipsum 1", AuthorId = "1", GameId = "2" },
        new Review { Id = "2", Rating = 10, Content = "lorem ipsum 2", AuthorId = "2", GameId = "1" },
        new Review { Id = "3", Rating = 7, Content = "lorem ipsum 3", AuthorId = "2", GameId = "3" },
        new Review { Id = "4", Rating = 5, Content = "lorem ipsum 4", AuthorId = "2", GameId = "4" },
        new Review { Id = "5", Rating = 8, Content = "lorem ipsum 5", AuthorId = "2", GameId = "5" },
        new Review { Id = "6", Rating = 10, Content = "lorem ipsum 6", AuthorId = "3", GameId = "2" },
        new Review { Id = "7", Rating = 7, Content = "lorem ipsum 7", AuthorId = "3", GameId = "1" },
    };
}