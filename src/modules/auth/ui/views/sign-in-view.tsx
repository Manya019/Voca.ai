"use client"
import { Card, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { useState } from "react"

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { OctagonAlert } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle } from "@/components/ui/alert"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


const FormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password is required")
})

export const SignInView = () => {
    const router = useRouter()
    const[error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false)


    const form = useForm<z.infer<typeof FormSchema>>(
        {
            resolver: zodResolver(FormSchema),
            defaultValues: {
                email: "",
                password: ""}
        }
    )

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setError(null);
    setPending(true);

    try {
        const response = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        });

        
        if (response.error) {
        setError(response.error.message || "Something went wrong");
        } else {
        router.push("/");
        }
    } catch (err: any) {
        setError(err?.message || "An unexpected error occurred");
    } finally {
        setPending(false);
    }


    }

    return (
    <div className="flex flex-col p-6 ">
    <Card className="p-0 overflow-hidden">
      <CardContent className="grid p-0 md:grid-cols-2">

                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold">
                                Welcome Back
                            </h1>
                            <p className="text-muted-foreground text-balance">
                                Login to your account
                            </p>
                        </div>
                        <div className="grid gap-3">
                            <FormField control={form.control} name="email" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type='email' placeholder="m@example.com" {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField control={form.control} name="password" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="********" {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                        </div>
                        {!!error && (
                        <Alert className="bg-destructive/10 border-none">
                            <OctagonAlert className="h-4 w-4 !text-destructive" />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                        )}
                        <Button disabled={pending} type="submit" className="w-full">
                            Sign In
                        </Button>
                        <div className=" after:border-border relative text-center text-sm after:absolute
                        after:inset-0 after:top-1/2 after:z-0 after-flex after:items-center after:border-t">
                            <span className="bg-card text-muted-foreground relative z-10 px-2 f">
                                Or continue with
                            </span>
                        </div>
                        <div className=" grid grid-cols-2 gap-4 ">
                            <Button disabled={pending} variant="outline" className="w-full">
                                <img src="/google.svg" alt="" className="h-4 w-4 mr-2" />
                                Google
                            </Button>
                            <Button disabled={pending} variant="outline" className="w-full">
                                <img src="/github.svg" alt="" className="h-4 w-4 mr-2" />
                                Github
                            </Button>
                        </div>
                        <div className="text-center text-sm">
                            Don&apos;t have an account? 
                            <Link href="/sign-up" className="text-green-600 hover:underline">
                            Sign Up
                            </Link>
                        </div>
                        
                    </div>
                </form>
                </Form>

                <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex  flex-col 
                gap-y-4 items-center justify-center ">
                    <img src="/logo.svg" alt="" className="h-[92px] w-[92px]" />
                <p className="text-2xl font-semibold text-white">
                    Voca.AI
                </p>
                </div>
            </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-sm text-balance *:[a]:underline-offset-4">
            By clicking here, you agree to our<Link href="/#" className="text-primary underline"> Terms of Service</Link> and  <a href="/#" className="text-primary underline">Privacy Policy</a>.
        </div>
    </div>
    )
}