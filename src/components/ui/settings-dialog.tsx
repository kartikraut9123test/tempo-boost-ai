import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Settings, Bell, Moon, Volume2, Clock, Zap, Shield, Database, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AppSettings {
  // Notifications
  breakReminders: boolean;
  taskNotifications: boolean;
  energyAlerts: boolean;
  emailNotifications: boolean;
  
  // Appearance
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  compactMode: boolean;
  
  // Productivity
  workHours: { start: string; end: string };
  breakInterval: number;
  energyTrackingFrequency: number;
  focusSessionLength: number;
  
  // Audio
  soundEnabled: boolean;
  soundVolume: number;
  
  // Privacy
  dataSharing: boolean;
  analytics: boolean;
  
  // Advanced
  autoSave: boolean;
  syncEnabled: boolean;
}

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const [settings, setSettings] = useState<AppSettings>({
    // Notifications
    breakReminders: true,
    taskNotifications: true,
    energyAlerts: true,
    emailNotifications: false,
    
    // Appearance
    theme: 'system',
    fontSize: 14,
    compactMode: false,
    
    // Productivity
    workHours: { start: '09:00', end: '17:00' },
    breakInterval: 45,
    energyTrackingFrequency: 30,
    focusSessionLength: 25,
    
    // Audio
    soundEnabled: true,
    soundVolume: 50,
    
    // Privacy
    dataSharing: false,
    analytics: true,
    
    // Advanced
    autoSave: true,
    syncEnabled: true,
  });

  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const saved = localStorage.getItem('appSettings');
    if (saved) {
      setSettings({ ...settings, ...JSON.parse(saved) });
    }
  };

  const saveSettings = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    toast({ title: 'Settings saved successfully!' });
  };

  const resetSettings = () => {
    localStorage.removeItem('appSettings');
    loadSettings();
    toast({ title: 'Settings reset to defaults' });
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'productivity-app-settings.json';
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Settings exported successfully!' });
  };

  const updateSetting = (key: keyof AppSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateNestedSetting = (parent: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [parent]: { ...(prev as any)[parent], [key]: value }
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            App Settings
          </DialogTitle>
          <DialogDescription>
            Customize your productivity app experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Break Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get notified when it's time for a break</p>
                </div>
                <Switch
                  checked={settings.breakReminders}
                  onCheckedChange={(checked) => updateSetting('breakReminders', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Task Notifications</Label>
                  <p className="text-sm text-muted-foreground">Notifications for task deadlines and completions</p>
                </div>
                <Switch
                  checked={settings.taskNotifications}
                  onCheckedChange={(checked) => updateSetting('taskNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Energy Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alerts about energy levels and optimization</p>
                </div>
                <Switch
                  checked={settings.energyAlerts}
                  onCheckedChange={(checked) => updateSetting('energyAlerts', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive productivity reports via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Moon className="w-4 h-4 mr-2" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Font Size: {settings.fontSize}px</Label>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([value]) => updateSetting('fontSize', value)}
                  min={12}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">Reduce spacing for more content on screen</p>
                </div>
                <Switch
                  checked={settings.compactMode}
                  onCheckedChange={(checked) => updateSetting('compactMode', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Productivity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Zap className="w-4 h-4 mr-2" />
                Productivity Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Work Start Time</Label>
                  <Input
                    type="time"
                    value={settings.workHours.start}
                    onChange={(e) => updateNestedSetting('workHours', 'start', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Work End Time</Label>
                  <Input
                    type="time"
                    value={settings.workHours.end}
                    onChange={(e) => updateNestedSetting('workHours', 'end', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Break Reminder Interval: {settings.breakInterval} minutes</Label>
                <Slider
                  value={[settings.breakInterval]}
                  onValueChange={([value]) => updateSetting('breakInterval', value)}
                  min={15}
                  max={120}
                  step={15}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Energy Tracking Frequency: {settings.energyTrackingFrequency} minutes</Label>
                <Slider
                  value={[settings.energyTrackingFrequency]}
                  onValueChange={([value]) => updateSetting('energyTrackingFrequency', value)}
                  min={15}
                  max={60}
                  step={15}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Focus Session Length: {settings.focusSessionLength} minutes</Label>
                <Slider
                  value={[settings.focusSessionLength]}
                  onValueChange={([value]) => updateSetting('focusSessionLength', value)}
                  min={15}
                  max={60}
                  step={5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Audio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Volume2 className="w-4 h-4 mr-2" />
                Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">Play sounds for notifications and interactions</p>
                </div>
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
                />
              </div>
              {settings.soundEnabled && (
                <div className="space-y-2">
                  <Label>Volume: {settings.soundVolume}%</Label>
                  <Slider
                    value={[settings.soundVolume]}
                    onValueChange={([value]) => updateSetting('soundVolume', value)}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Shield className="w-4 h-4 mr-2" />
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">Share anonymized productivity data to improve the app</p>
                </div>
                <Switch
                  checked={settings.dataSharing}
                  onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Analytics</Label>
                  <p className="text-sm text-muted-foreground">Allow collection of usage analytics</p>
                </div>
                <Switch
                  checked={settings.analytics}
                  onCheckedChange={(checked) => updateSetting('analytics', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Advanced */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Database className="w-4 h-4 mr-2" />
                Advanced Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Save</Label>
                  <p className="text-sm text-muted-foreground">Automatically save changes as you work</p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Cloud Sync</Label>
                  <p className="text-sm text-muted-foreground">Sync data across devices</p>
                </div>
                <Switch
                  checked={settings.syncEnabled}
                  onCheckedChange={(checked) => updateSetting('syncEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={saveSettings}>
              Save Settings
            </Button>
            <Button variant="outline" onClick={exportSettings}>
              <Download className="w-4 h-4 mr-2" />
              Export Settings
            </Button>
            <Button variant="secondary" onClick={resetSettings}>
              Reset to Defaults
            </Button>
          </div>

          <div className="text-center pt-4">
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              Settings are automatically saved locally
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}