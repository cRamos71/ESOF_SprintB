import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const skillsData = [
  { full_description: 'JavaScript - A programming language for building web applications' },
  { full_description: 'Node.js - A JavaScript runtime built on Chrome\'s V8 JavaScript engine' },
  { full_description: 'React - A JavaScript library for building user interfaces' },
  { full_description: 'TypeScript - A typed superset of JavaScript that compiles to plain JavaScript' },
  { full_description: 'Python - A high-level programming language used for web development, data science, etc.' },
  { full_description: 'Java - A widely used programming language for building platform-independent applications' },
  { full_description: 'SQL - A language for managing and querying relational databases' },
  { full_description: 'Docker - A platform for automating deployment of applications inside lightweight containers' },
  { full_description: 'GraphQL - A query language for your API and runtime for executing queries with your existing data' },
  { full_description: 'CSS - A stylesheet language used for describing the presentation of a document written in HTML' },
  { full_description: 'HTML - The standard markup language for creating web pages' },
  { full_description: 'AWS - Amazon Web Services, a cloud computing platform' },
  { full_description: 'Git - A distributed version control system for tracking changes in source code' },
  { full_description: 'Ruby on Rails - A web application framework written in Ruby' },
  { full_description: 'Kubernetes - A container orchestration platform for automating application deployment' },
];

async function main() {
  console.log('Seeding skills...');
  for (const skill of skillsData) {
    await prisma.skills.create({
      data: skill,
    });
  }
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });