# SkillSync 🎓

SkillSync is a peer-to-peer learning platform that connects learners with skilled mentors. Built with Next.js, Auth0, and MongoDB, deployed using Terraform for infrastructure automation.

## 🚀 Features

- **Secure Authentication** with Auth0
- **Protected Dashboard** for both teachers and students
- **Real-time Session Management**
- **Infrastructure as Code** using Terraform
- **MongoDB Atlas Integration**
- **Automated Deployment** with Vercel

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Authentication**: Auth0
- **Database**: MongoDB Atlas
- **Infrastructure**: Terraform
- **Deployment**: Vercel
- **Type Safety**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- Terraform CLI installed
- An Auth0 account
- A MongoDB Atlas account
- A Vercel account

## ⚙️ Environment Variables

Create a `.env.local` file:

```bash
# Auth0
AUTH0_SECRET='your-auth0-secret'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='your-auth0-domain'
AUTH0_CLIENT_ID='your-auth0-client-id'
AUTH0_CLIENT_SECRET='your-auth0-client-secret'

# MongoDB
MONGODB_URI='your-mongodb-uri'
```

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/skillsync.git
cd skillsync
```

2. Install dependencies:
```bash
npm install
```

3. Set up Auth0:
- Create a new Auth0 application
- Configure callback URLs:
  - http://localhost:3000/api/auth/callback
  - http://localhost:3000
- Add social connections (optional)

4. Set up MongoDB Atlas:
- Create a new cluster
- Create a database user
- Whitelist your IP address
- Get your connection string

5. Run the development server:
```bash
npm run dev
```

## 🏗️ Infrastructure Deployment

1. Initialize Terraform:
```bash
cd terraform
terraform init
```

2. Create `terraform.tfvars`:
```hcl
vercel_api_token      = "your-vercel-token"
domain_name           = "your-domain.com"
mongodb_public_key    = "your-mongodb-public-key"
mongodb_private_key   = "your-mongodb-private-key"
mongodb_project_id    = "your-mongodb-project-id"
mongodb_user_password = "your-secure-password"
auth0_secret         = "your-auth0-secret"
auth0_issuer_base_url = "your-auth0-domain"
auth0_client_id      = "your-auth0-client-id"
auth0_client_secret  = "your-auth0-client-secret"
```

3. Deploy infrastructure:
```bash
terraform plan
terraform apply
```

## 📁 Project Structure

```
skillsync/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utility functions
├── terraform/             # Infrastructure as Code
└── types/
