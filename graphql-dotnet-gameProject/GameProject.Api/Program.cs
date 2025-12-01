using GameProject.Api.Data;
using GameProject.Api.GraphQL;
using HotChocolate.Execution.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<DataStore>();


builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddTypeExtension<GameResolvers>()
    .AddTypeExtension<AuthorResolvers>()
    .AddTypeExtension<ReviewResolvers>();


var app = builder.Build();

app.MapGraphQL();

app.Run();