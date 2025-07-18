const layout = ({ children }: { children: React.ReactNode }) => {
return(
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm md:max-w-3xl">
            {children}
        </div>
    </div>
)
}

export default layout;