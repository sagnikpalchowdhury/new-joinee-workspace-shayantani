namespace GameProject.Api.Models;

public record AddGameInput(string Title, List<string> Platform);

public record EditGameInput(string? Title, List<string>? Platform);