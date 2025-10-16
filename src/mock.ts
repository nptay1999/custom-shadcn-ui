import { v4 as uuidv4 } from 'uuid'

const firstNames = [
  'John',
  'Jim',
  'Joe',
  'Anna',
  'Jane',
  'Robert',
  'Lisa',
  'Tom',
  'Chris',
  'Alex',
  'Emily',
  'Michael',
  'Sarah',
  'David',
  'Jessica',
  'Daniel',
  'Laura',
  'Matthew',
  'Emma',
  'Andrew',
  'Olivia',
  'Joshua',
  'Sophia',
  'Ryan',
  'Megan',
  'Brandon',
  'Rachel',
  'Tyler',
  'Samantha',
  'Nicholas',
  'Hannah',
  'Anthony',
  'Ashley',
  'Benjamin',
  'Amanda',
  'Samuel',
  'Brittany',
  'Jacob',
  'Victoria',
  'Ethan',
]

const lastNames = [
  'Brown',
  'Green',
  'Black',
  'White',
  'Smith',
  'Taylor',
  'Lee',
  'Walker',
  'King',
  'Scott',
  'Young',
  'Allen',
  'Wright',
  'Hill',
  'Adams',
  'Baker',
  'Nelson',
  'Carter',
  'Mitchell',
  'Perez',
  'Roberts',
  'Turner',
  'Phillips',
  'Campbell',
  'Parker',
  'Evans',
  'Edwards',
  'Collins',
  'Stewart',
  'Morris',
]

const statuses = ['Single', 'Complicated', 'Married', 'Divorced']

export type TUserRecord = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
  id: string
}

export function generateMockUsers(count = 100): Array<TUserRecord> {
  const users = Array.from({ length: count }, () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

    return {
      id: uuidv4(),
      firstName,
      lastName,
      age: Math.floor(Math.random() * 60) + 18, // age between 18-77
      visits: Math.floor(Math.random() * 1000), // visits between 0-99
      status: statuses[Math.floor(Math.random() * statuses.length)],
      progress: Math.floor(Math.random() * 100), // progress between 0-99
    }
  })

  return users
}
