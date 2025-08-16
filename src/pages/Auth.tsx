import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      const redirectUrl = `${window.location.origin}/dashboard`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl }
      });
      if (error) {
        toast({ title: 'Sign up failed', description: error.message });
      } else {
        toast({ title: 'Check your email', description: 'Confirm your email to continue.' });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: 'Login failed', description: error.message });
      } else {
        toast({ title: 'Welcome back!' });
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">
              {isSignUp ? 'Sign up' : 'Sign in'}
            </Button>
          </form>
          <div className="mt-4 text-sm text-muted-foreground text-center">
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button className="text-primary" onClick={() => setIsSignUp(false)}>Sign in</button>
              </span>
            ) : (
              <span>
                New here?{' '}
                <button className="text-primary" onClick={() => setIsSignUp(true)}>Create an account</button>
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
