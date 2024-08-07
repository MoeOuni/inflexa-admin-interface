import { useLogin } from '@/api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth-context';


const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(32, { message: 'Password must be at most 32 characters long' }),
});

type ILogin = z.infer<typeof LoginFormSchema>;

const Login = () => {

  const { setToken } = useContext(AuthContext);
  const loginFn = useLogin();

  const form = useForm<ILogin>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(data: ILogin) {
    const response = await loginFn.mutateAsync(data);

    if (response.status === 200) {
      setToken(response.data.data);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              Login to{' '}
              <div className="flex items-center gap-1">
                <img src="./icon-logo.svg" className="h-8" />{' '}
                <span style={{ color: '#0074D9' }}>Inflexa admin</span>
              </div>
            </CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loginFn.isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loginFn.isPending}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              disabled={loginFn.isPending}
            >
              {loginFn.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}{' '}
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default Login;
