import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { Button } from '../../components/ui/button';
import { useToast } from '../../hooks/use-toast';

// TypeScript interfaces
interface Profile {
  user_id: string;
  name: string;
  locale: string;
  role: string;
  created_at: string;
}

interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
}

interface UsageCounter {
  id: string;
  user_id: string;
  ai_messages_used: number;
  voice_minutes_used: number;
  ocr_pages_used: number;
  period_start: string;
  period_end: string;
}

interface AdminData {
  profiles: Profile[];
  subscriptions: Subscription[];
  usage_counters: UsageCounter[];
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { toast } = useToast();
  
  const [data, setData] = useState<AdminData>({
    profiles: [],
    subscriptions: [],
    usage_counters: []
  });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState<Profile | null>(null);

  // Check if current user is admin and fetch all data
  useEffect(() => {
    const fetchAdminData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Check current user's role first
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          toast({
            title: t('admin.error.title'),
            description: t('admin.error.profile'),
            variant: 'destructive'
          });
          setLoading(false);
          return;
        }

        setCurrentUserProfile(profile);
        
        // Check if user is admin
        if (profile.role !== 'admin') {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        setIsAdmin(true);

        // Fetch all admin data in parallel
        const [profilesResult, subscriptionsResult, usageResult] = await Promise.all([
          supabase
            .from('profiles')
            .select('user_id, name, locale, role, created_at')
            .order('created_at', { ascending: false }),
          
          supabase
            .from('subscriptions')
            .select('id, user_id, plan, status, current_period_start, current_period_end')
            .order('created_at', { ascending: false }),
          
          supabase
            .from('usage_counters')
            .select('id, user_id, ai_messages_used, voice_minutes_used, ocr_pages_used, period_start, period_end')
            .order('period_start', { ascending: false })
        ]);

        // Check for errors
        if (profilesResult.error) {
          console.error('Error fetching profiles:', profilesResult.error);
          throw new Error('Failed to fetch profiles');
        }
        if (subscriptionsResult.error) {
          console.error('Error fetching subscriptions:', subscriptionsResult.error);
          throw new Error('Failed to fetch subscriptions');
        }
        if (usageResult.error) {
          console.error('Error fetching usage counters:', usageResult.error);
          throw new Error('Failed to fetch usage counters');
        }

        setData({
          profiles: profilesResult.data || [],
          subscriptions: subscriptionsResult.data || [],
          usage_counters: usageResult.data || []
        });

      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast({
          title: t('admin.error.title'),
          description: t('admin.error.fetch'),
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [user, supabase, toast, t]);

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Format role badge
  const formatRole = (role: string) => {
    const roleColors = {
      admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      user: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      premium: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[role as keyof typeof roleColors] || roleColors.user}`}>
        {role}
      </span>
    );
  };

  // Format status badge
  const formatStatus = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      canceled: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      trialing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors] || statusColors.inactive}`}>
        {status}
      </span>
    );
  };

  // Loading skeleton for tables
  const TableSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );

  // Access denied component
  if (!loading && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {t('admin.accessDenied.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('admin.accessDenied.description')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('admin.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('admin.subtitle')}
          </p>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              {t('admin.tabs.users')} ({data.profiles.length})
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              {t('admin.tabs.subscriptions')} ({data.subscriptions.length})
            </TabsTrigger>
            <TabsTrigger value="usage" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {t('admin.tabs.usage')} ({data.usage_counters.length})
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  {t('admin.users.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <TableSkeleton />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.users.columns.userId')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.users.columns.name')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.users.columns.locale')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.users.columns.role')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.users.columns.createdAt')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.profiles.map((profile, index) => (
                          <tr key={profile.user_id} className={`border-b border-border ${index % 2 === 0 ? 'bg-card' : 'bg-background'}`}>
                            <td className="p-3 text-sm font-mono">{profile.user_id.slice(0, 8)}...</td>
                            <td className="p-3 text-sm">{profile.name || 'N/A'}</td>
                            <td className="p-3 text-sm">{profile.locale || 'en'}</td>
                            <td className="p-3">{formatRole(profile.role)}</td>
                            <td className="p-3 text-sm text-muted-foreground">{formatDate(profile.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  {t('admin.subscriptions.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <TableSkeleton />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.subscriptions.columns.id')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.subscriptions.columns.userId')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.subscriptions.columns.plan')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.subscriptions.columns.status')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.subscriptions.columns.periodStart')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.subscriptions.columns.periodEnd')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.subscriptions.map((subscription, index) => (
                          <tr key={subscription.id} className={`border-b border-border ${index % 2 === 0 ? 'bg-card' : 'bg-background'}`}>
                            <td className="p-3 text-sm font-mono">{subscription.id.slice(0, 8)}...</td>
                            <td className="p-3 text-sm font-mono">{subscription.user_id.slice(0, 8)}...</td>
                            <td className="p-3 text-sm">{subscription.plan}</td>
                            <td className="p-3">{formatStatus(subscription.status)}</td>
                            <td className="p-3 text-sm text-muted-foreground">{formatDate(subscription.current_period_start)}</td>
                            <td className="p-3 text-sm text-muted-foreground">{formatDate(subscription.current_period_end)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {t('admin.usage.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <TableSkeleton />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.usage.columns.id')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.usage.columns.userId')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.usage.columns.aiMessages')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.usage.columns.voiceMinutes')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.usage.columns.ocrPages')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.usage.columns.periodStart')}</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">{t('admin.usage.columns.periodEnd')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.usage_counters.map((usage, index) => (
                          <tr key={usage.id} className={`border-b border-border ${index % 2 === 0 ? 'bg-card' : 'bg-background'}`}>
                            <td className="p-3 text-sm font-mono">{usage.id.slice(0, 8)}...</td>
                            <td className="p-3 text-sm font-mono">{usage.user_id.slice(0, 8)}...</td>
                            <td className="p-3 text-sm">{usage.ai_messages_used}</td>
                            <td className="p-3 text-sm">{usage.voice_minutes_used}</td>
                            <td className="p-3 text-sm">{usage.ocr_pages_used}</td>
                            <td className="p-3 text-sm text-muted-foreground">{formatDate(usage.period_start)}</td>
                            <td className="p-3 text-sm text-muted-foreground">{formatDate(usage.period_end)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
