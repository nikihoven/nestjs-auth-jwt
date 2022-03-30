# Nest JS JWT authorization with 2 tokens  

This is an example of how to implement an authentication system in Nest JS using Passport.js, and Json Web Tokens (JWT).

---

# Using stack

- Typescript
- Nest JS
    - Postgres 
    - Prisma 
    - Passport JS
    - Json Web Token (JWT)

---

# Get started

#### Install dependencies
```bash
yarn install
```
#### Create ```.env``` and fill it like ```.env.example``` file

#### Migrate Prisma schema 

```bash
yarn migrate
```

#### Start the server

In dev mode:
```bash
yarn start
```

In prod mode:
```bash
yarn star:prod
```

---
# Endpoints

```/auth/signup```

### Sign up to the application

Incoming data: 

```ts
{
    // Must contain more than 6 and less than 24 characters
    nickname: string
    
    // Must contain more than 6 and less than 24 characters
    password: string
}
```

Output data:

```ts
{
    // Body
    id: string
    nickname: string
    accessToken: string
}

    // Cookie (httpOnly, secure)
    token: string
```

Exceptions:

```js
{
    'Incorrect nickname or password': {
        status: 406
    },
    
    'Try to create already existed person': {
        status: 409
    },
    
    'Prisma fail': {
        status: 520
    },
    
    'Unrecognized error': {
        stauts: 500
    }
}
```

---

```/auth/login```

### Log in to the application

Incoming data:

```ts
body: {
    // Must contain more than 6 and less than 24 characters
    nickname: string
    
    // Must contain more than 6 and less than 24 characters
    password: string
}
```

Output data:

```ts
body: {
    id: string
    nickname: string
    accessToken: string
}

cookie: { 
    // httpOnly, secure
    token: string
}
```

Exceptions:

```js
{
    'Incorrect nickname or password': {
        status: 406
    },
    
    'Invalid nickname or password': {
        status: 400
    },
    
    'Prisma fail': {
        status: 520
    },
    
    'Unrecognized error': {
        stauts: 500
    }
}
```

---

```/auth/refresh```

### Create new JWT tokens

Incoming data:

```ts
cookie: {
    // Cookie (httpOnly, secure)
    token: string
}
```

Output data:

```ts
body: {
    accessToken: string
}

cookie: {
    // Cookie (httpOnly, secure)
    token: string
}
```

Exceptions:

```js
{
    'No token in cookie or invalid token': {
        status: 401
    },
    
    'Prisma fail': {
        status: 520
    },
    
    'Unrecognized error': {
        stauts: 500
    }
}
```

---

```/auth/logout```

### Log out of application

Incoming data:

```ts
headers: {
    Authorization: Bearer ${ token: string }
}
```

Output data:

```ts
body: true
```

Exceptions:

```js
{
    'No token in Authorization header or invalid token': {
        status: 401
    },
    
    'Prisma fail': {
        status: 520
    },
    
    'Unrecognized error': {
        stauts: 500
    }
}
```