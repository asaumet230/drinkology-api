import { IUser } from '../interfaces';

export const usersData: IUser[] = [
    {
        name: "test1",
        lastName: "last test1",
        email: "test1@test.com",
        role: "admin_role",
        password: "test11986",
        record: [
            {
                userName: "seedUser",
                userId: "12345678910",
            },
        ],
    },
    {
        name: "test2",
        lastName: "last test2",
        active: true,
        email: "test2@test.com",
        password: "test21986",
        role: "user_role",
        record: [
            {
                userName: "seedUser",
                userId: "12345678910",
            },
        ],
    },
    {
        name: "test3",
        lastName: "last test3",
        active: true,
        email: "test3@test.com",
        password: "test31986",
        role: "sales_role",
        record: [
            {
                userName: "seedUser",
                userId: "12345678910",
            },
        ],
    },
    {
        name: "test4",
        lastName: "last test4",
        active: true,
        email: "test4@test.com",
        password: "test41986",
        role: "seo_role",
        record: [
            {
                userName: "seedUser",
                userId: "12345678910",
            },
        ],
      
    }
];