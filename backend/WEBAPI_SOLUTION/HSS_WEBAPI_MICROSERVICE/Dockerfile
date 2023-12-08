#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["HSS_WEBAPI_MICROSERVICE/HSS_WEBAPI_MICROSERVICE.csproj", "HSS_WEBAPI_MICROSERVICE/"]
RUN dotnet restore "HSS_WEBAPI_MICROSERVICE/HSS_WEBAPI_MICROSERVICE.csproj"
COPY . .
WORKDIR "/src/HSS_WEBAPI_MICROSERVICE"
RUN dotnet build "HSS_WEBAPI_MICROSERVICE.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "HSS_WEBAPI_MICROSERVICE.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HSS_WEBAPI_MICROSERVICE.dll"]