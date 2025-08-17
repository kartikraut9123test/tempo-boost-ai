import { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { User, Settings, Bell, BellOff, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface UserProfile {
  id: string;
  display_name: string | null;
  email: string | null;
}

interface UserProfileDropdownProps {
  onSignOut: () => void;
  onShowUserInfo?: () => void;
  onShowSettings?: () => void;
}

export function UserProfileDropdown({ onSignOut, onShowUserInfo, onShowSettings }: UserProfileDropdownProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
    loadAlertsPreference();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('id, display_name, email')
        .eq('user_id', user.id)
        .single();
      
      if (data) {
        setProfile(data);
      } else {
        // Create profile if it doesn't exist
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            display_name: user.email?.split('@')[0] || 'User',
            email: user.email
          })
          .select('id, display_name, email')
          .single();
        
        if (newProfile) {
          setProfile(newProfile);
        }
      }
    }
  };

  const loadAlertsPreference = () => {
    const saved = localStorage.getItem('alertsEnabled');
    setAlertsEnabled(saved !== 'false');
  };

  const toggleAlerts = (enabled: boolean) => {
    setAlertsEnabled(enabled);
    localStorage.setItem('alertsEnabled', enabled.toString());
    toast({
      title: enabled ? 'Alerts enabled' : 'Alerts disabled',
      description: enabled ? 'You will receive productivity alerts' : 'Alerts have been turned off'
    });
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={profile?.display_name || 'User'} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(profile?.display_name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile?.display_name || 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {profile?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => onShowUserInfo?.()}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => onShowSettings?.()}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          <div className="flex items-center">
            {alertsEnabled ? (
              <Bell className="mr-2 h-4 w-4" />
            ) : (
              <BellOff className="mr-2 h-4 w-4" />
            )}
            <span>Alerts</span>
          </div>
          <Switch
            checked={alertsEnabled}
            onCheckedChange={toggleAlerts}
            className="ml-2"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={onSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}