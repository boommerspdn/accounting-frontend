# API Endpoints

Base URL: `http://localhost:1337` (dev) or your production domain.

All requests require an API token header:
```
Authorization: Bearer <your-api-token>
```

---

## fastontime.co.th

### Single Types

```
GET /api/fastontime-about-page
GET /api/fastontime-contact-page
GET /api/fastontime-home-page
GET /api/fastontime-layout
```

### Collection Type — Services

```
GET /api/fastontime-services
GET /api/fastontime-services/:id
```

### Recommended query params

```
?populate=*&status=published
```

### Examples

```
GET /api/fastontime-home-page?populate=*&status=published
GET /api/fastontime-layout?populate=*&status=published
GET /api/fastontime-services?populate=*&status=published
GET /api/fastontime-services/registration-certificate?populate=*&status=published
```
