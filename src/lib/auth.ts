import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; 
import * as schema from "@/db/schema"; 
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },trustedOrigins: ['http://192.168.1.11:3000'],
    database: drizzleAdapter(db, {
        provider: "pg", 
        schema:{
            ...schema,
        }
    })
})


