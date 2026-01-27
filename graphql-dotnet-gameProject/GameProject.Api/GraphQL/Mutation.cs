using GameProject.Api.Data;
using GameProject.Api.Models;

namespace GameProject.Api.GraphQL;

public class Mutation
{
    public IEnumerable<Game> DeleteGame(string id, [Service] DataStore db)
    {
        db.Games.RemoveAll(g => g.Id == id);
        db.Reviews.RemoveAll(r => r.GameId == id);
        return db.Games;
    }

    public Game AddGame(AddGameInput game, [Service] DataStore db)
    {
        var newGame = new Game
        {
            Id = Guid.NewGuid().ToString(),
            Title = game.Title,
            Platform = game.Platform
        };

        db.Games.Add(newGame);
        return newGame;
    }

    public Game? UpdateGame(string id, EditGameInput edits, [Service] DataStore db)
    {
        var gameToUpdate = db.Games.FirstOrDefault(g => g.Id == id);

        if (gameToUpdate is null)
        {
            return null;
        }
        if (edits.Title is not null)
        {
            gameToUpdate.Title = edits.Title;
        }

        if (edits.Platform is not null)
        {
            gameToUpdate.Platform = edits.Platform;
        }

        return gameToUpdate;
    }
}