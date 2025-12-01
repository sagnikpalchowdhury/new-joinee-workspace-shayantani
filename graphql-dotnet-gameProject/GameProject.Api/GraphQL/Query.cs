using GameProject.Api.Data;
using GameProject.Api.Models;
using HotChocolate.Types;

namespace GameProject.Api.GraphQL;

public class Query
{
    public List<Game> GetGames([Service] DataStore db) => db.Games;
    public Game? GetGame(string id, [Service] DataStore db) => db.Games.FirstOrDefault(g => g.Id == id);

    public List<Author> GetAuthors([Service] DataStore db) => db.Authors;
    public Author? GetAuthor(string id, [Service] DataStore db) => db.Authors.FirstOrDefault(a => a.Id == id);

    public List<Review> GetReviews([Service] DataStore db) => db.Reviews;
    public Review? GetReview(string id, [Service] DataStore db) => db.Reviews.FirstOrDefault(r => r.Id == id);
}

[ExtendObjectType(typeof(Game))]
public class GameResolvers
{
    public IEnumerable<Review> GetReviews([Parent] Game game, [Service] DataStore db)
    {
        return db.Reviews.Where(r => r.GameId == game.Id);
    }
}

[ExtendObjectType(typeof(Author))]
public class AuthorResolvers
{
    public IEnumerable<Review> GetReviews([Parent] Author author, [Service] DataStore db)
    {
        return db.Reviews.Where(r => r.AuthorId == author.Id);
    }
}

[ExtendObjectType(typeof(Review))]
public class ReviewResolvers
{
    public Author? GetAuthor([Parent] Review review, [Service] DataStore db)
    {
        return db.Authors.FirstOrDefault(a => a.Id == review.AuthorId);
    }

    public Game? GetGame([Parent] Review review, [Service] DataStore db)
    {
        return db.Games.FirstOrDefault(g => g.Id == review.GameId);
    }
}