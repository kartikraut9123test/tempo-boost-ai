import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, MapPin, Briefcase, Clock, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface UserInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserProfile {
  id: string;
  display_name: string | null;
  email: string | null;
  bio?: string;
  location?: string;
  job_title?: string;
  joined_date?: string;
}

export function UserInfoDialog({ isOpen, onClose }: UserInfoDialogProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    location: '',
    job_title: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadProfile();
    }
  }, [isOpen]);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (data) {
        const row = data as unknown as UserProfile;
        setProfile(row);
        setFormData({
          display_name: row.display_name || '',
          bio: row.bio || '',
          location: row.location || '',
          job_title: row.job_title || ''
        });
      }
    }
  };

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({ title: 'Profile updated successfully!' });
      setIsEditing(false);
      loadProfile();
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Mock stats data
  const userStats = {
    tasksCompleted: 142,
    totalFocusTime: '89h 32m',
    streak: 12,
    energyOptimization: 87,
    joinedDays: 45
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            User Profile
          </DialogTitle>
          <DialogDescription>
            Manage your personal information and view your productivity stats
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="" alt={profile?.display_name || 'User'} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {getInitials(profile?.display_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{profile?.display_name || 'User'}</h3>
              <p className="text-muted-foreground">{profile?.email}</p>
              <div className="flex items-center mt-2 space-x-4">
                <Badge variant="secondary">
                  <Calendar className="w-3 h-3 mr-1" />
                  Joined {userStats.joinedDays} days ago
                </Badge>
                <Badge variant="outline">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {userStats.streak} day streak
                </Badge>
              </div>
            </div>
            <Button 
              variant={isEditing ? "default" : "outline"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="display_name">Display Name</Label>
                      <Input
                        id="display_name"
                        value={formData.display_name}
                        onChange={(e) => setFormData({...formData, display_name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job_title">Job Title</Label>
                      <Input
                        id="job_title"
                        value={formData.job_title}
                        onChange={(e) => setFormData({...formData, job_title: e.target.value})}
                        placeholder="e.g. Software Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="e.g. San Francisco, CA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    </div>
                    <Button onClick={handleSave} className="w-full">
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{profile?.email}</span>
                    </div>
                    {formData.job_title && (
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{formData.job_title}</span>
                      </div>
                    )}
                    {formData.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{formData.location}</span>
                      </div>
                    )}
                    {formData.bio && (
                      <div className="space-y-2">
                        <Label>Bio</Label>
                        <p className="text-sm text-muted-foreground">{formData.bio}</p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Productivity Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{userStats.tasksCompleted}</div>
                    <div className="text-xs text-muted-foreground">Tasks Completed</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-success">{userStats.totalFocusTime}</div>
                    <div className="text-xs text-muted-foreground">Focus Time</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-warning">{userStats.energyOptimization}%</div>
                    <div className="text-xs text-muted-foreground">Energy Optimization</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent">{userStats.streak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Goal Progress</span>
                    <span>8/10 tasks</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Energy Optimization</span>
                    <span>{userStats.energyOptimization}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: `${userStats.energyOptimization}%` }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm">Completed "Review quarterly reports"</span>
                  <Badge variant="outline">2 hours ago</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm">Achieved 5-day focus streak</span>
                  <Badge variant="outline">1 day ago</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm">Updated energy optimization score</span>
                  <Badge variant="outline">2 days ago</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}