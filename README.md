# Testing drizzle

A small api made to explore drizzle orm

## Requirements

- Deno
- PostgreSQL

## Running

After cloning the repo enter its directory and run:

```bash
deno install
```

Next rename `.env.example` to `.env` and fill its contents,then create the
database by running:

```bash
deno task db:push
```

Finally run the app by typing:

```bash
deno task dev
```
