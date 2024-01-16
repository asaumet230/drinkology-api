import { IRole } from '../interfaces';

export const rolesData: IRole[] = [
    {
        name: "admin_role",
        active: true,
        description: "as an administrative user, you will have access to specialized tools that allow you to supervise, coordinate, and efficiently enhance internal processes. from this intuitive interface, you can track detailed project progress, manage resources, maintain effective communication with team members, and generate custom reports to assess performance. data security is paramount, and our system ensures a protected environment for handling confidential information with peace of mind.",
        record: [
            {
                userName: "seedUser",
                userId: "12345678910",
            },
            
        ],
     
    },
    {
        name: "user_role",
        active: true,
        description: "as a regular user, you'll have access to a range of features that simplify tasks, enhance communication, and ensure a seamless workflow. stay organized by tracking your projects, collaborating with team members, and accessing important information with ease.",
        record: [
            {
                userName: "seedUser",
                userId: "12345678910",
            },
        ],
    },
    {
        name: "sales_role",
        active: true,
        description: "as a sales user, you'll have access to a dynamic set of capabilities designed to boost your efficiency. manage leads, track opportunities, and close deals seamlessly—all within one user-friendly interface. stay on top of your sales pipeline, and access real-time data to make informed decisions that drive results.",
        record: [
            {
                userName: "seedUser",
                userId: "12345678910",
            },
            
        ],
    },
    {
        name: "seo_role",
        active: true,
        description: "as an seo user, you'll have access to advanced analytics, keyword research tools, and performance metrics to fine-tune your website's visibility. effortlessly track rankings, analyze backlinks, and monitor the effectiveness of your optimization efforts—all within an intuitive and user-friendly interface.",
        record: [
            {
                userName: "seedUser",
                userId: "12345678910",
            },
        ],
    }
]