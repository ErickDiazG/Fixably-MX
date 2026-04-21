import React from 'react'
import { Users, Briefcase, Star, AlertTriangle, LogOut, CheckCircle2, Clock, XCircle, Search, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logoutAction } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // 1. Auth & Permisos
  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError || !userData?.user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', userData.user.id)
    .single()

  if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
    redirect('/')
  }

  const isSuperAdmin = profile.role === 'super_admin'

  // 2. Fetch Data Metrics en paralelo (Optimizado)
  const [
    { count: totalClients },
    { count: totalPros },
    { count: totalProjects },
    { count: pendingPros }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
    supabase.from('professionals').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('professionals').select('*', { count: 'exact', head: true }).eq('verification_status', 'pending')
  ])

  // 3. Fetch Últimos Profesionales (Con JOIN a perfiles)
  const { data: recentPros } = await supabase
    .from('professionals')
    .select(`
      id,
      business_name,
      verification_status,
      created_at,
      profiles (full_name, phone)
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    { name: 'CLIENTES', value: totalClients || 0, icon: Users },
    { name: 'PROS. TOTALES', value: totalPros || 0, icon: Briefcase },
    { name: 'OBRAS ACTIVAS', value: totalProjects || 0, icon: Star },
    { name: 'REVISIONES', value: pendingPros || 0, icon: AlertTriangle, isWarning: (pendingPros || 0) > 0 },
  ]

  // Helpers de estado visual
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'verified': return <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-700 px-3 py-1 rounded-sm border-2 border-green-700 font-bold text-xs uppercase tracking-widest"><CheckCircle2 className="h-4 w-4"/> Verificado</span>
      case 'rejected': return <span className="inline-flex items-center gap-1.5 bg-red-500/10 text-destructive px-3 py-1 rounded-sm border-2 border-destructive font-bold text-xs uppercase tracking-widest"><XCircle className="h-4 w-4"/> Rechazado</span>
      default: return <span className="inline-flex items-center gap-1.5 bg-accent/20 text-primary px-3 py-1 rounded-sm border-2 border-primary font-bold text-xs uppercase tracking-widest"><Clock className="h-4 w-4"/> Pendiente</span>
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background selection:bg-accent selection:text-primary">
      {/* HEADER BRUTALISTA */}
      <header className="flex h-20 items-center justify-between border-b-4 border-primary bg-background px-6 lg:px-12">
        <div className="flex items-center gap-4">
          <div className="bg-primary text-primary-foreground px-4 py-2 border-2 border-primary font-black tracking-widest text-lg shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
            FIXABLY-MX
          </div>
          {isSuperAdmin ? (
            <span className="bg-destructive text-destructive-foreground px-3 py-1 font-bold text-xs uppercase tracking-widest border-2 border-destructive shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
              SUPER ADMIN
            </span>
          ) : (
            <span className="bg-blue-600 text-white px-3 py-1 font-bold text-xs uppercase tracking-widest border-2 border-blue-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
              ADMINISTRADOR
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sesión Activa</p>
            <p className="text-sm font-black text-foreground">{profile.full_name}</p>
          </div>
          <form action={logoutAction}>
            <Button variant="default" size="icon" title="Cerrar sesión" className="border-2 border-primary shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rounded-none hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all">
              <LogOut className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </header>

      <main className="flex-1 space-y-12 p-6 lg:p-12">
        
        {/* TITULAR */}
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground leading-none mb-2">
            PANEL DE <span className="bg-accent px-2 text-primary">OPERACIONES</span>
          </h1>
          <p className="text-lg font-medium text-muted-foreground uppercase tracking-wide">
            {isSuperAdmin ? 'Control global maestro habilitado.' : 'Visor analítico en tiempo real.'}
          </p>
        </div>

        {/* MÉTRICAS (Hero Stats) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div 
              key={stat.name} 
              className={`p-6 border-4 border-primary shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all ${
                stat.isWarning ? 'bg-accent text-primary shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] border-destructive' : 'bg-card'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-black uppercase tracking-widest ${stat.isWarning ? 'text-primary' : 'text-muted-foreground'}`}>
                  {stat.name}
                </h3>
                <div className={`p-2 border-2 border-primary ${stat.isWarning ? 'bg-background' : 'bg-accent'}`}>
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="text-5xl font-black tracking-tighter">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* ZONA INFERIOR: Tabla y Peligro */}
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          
          {/* TABLA DE PROFESIONALES */}
          <div className="lg:col-span-2 border-4 border-primary bg-card p-6 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex items-center justify-between mb-8 border-b-4 border-primary pb-4">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">Profesionales Recientes</h2>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Últimos 5 registros en base de datos</p>
              </div>
              <Button variant="outline" className="border-2 border-primary font-bold uppercase tracking-widest">
                <Search className="mr-2 h-4 w-4"/> Ver Todos
              </Button>
            </div>

            {recentPros && recentPros.length > 0 ? (
              <div className="space-y-4">
                {recentPros.map((pro) => (
                  <div key={pro.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-2 border-border hover:border-primary transition-colors bg-muted/10">
                    <div>
                      <h4 className="font-black text-lg text-foreground uppercase truncate w-48 sm:w-64">
                        {pro.business_name || pro.profiles?.full_name || 'Sin nombre'}
                      </h4>
                      <p className="text-sm font-bold text-muted-foreground">
                        Tel: {pro.profiles?.phone || 'N/A'} • Se unió {new Date(pro.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(pro.verification_status)}
                      <Button size="sm" className="border-2 border-primary bg-primary text-primary-foreground font-bold hover:bg-primary/90">
                        REVISAR
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground border-2 border-dashed border-muted font-bold uppercase tracking-widest">
                No hay profesionales registrados aún.
              </div>
            )}
          </div>

          {/* ZONA SUPER ADMIN */}
          {isSuperAdmin && (
            <div className="border-4 border-destructive bg-destructive/5 p-6 shadow-[12px_12px_0px_0px_rgba(220,38,38,1)]">
              <div className="mb-6 border-b-4 border-destructive pb-4">
                <h2 className="flex items-center text-2xl font-black uppercase tracking-tight text-destructive">
                  <Settings className="mr-2 h-6 w-6"/> ZONA ROJA
                </h2>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Configuración Crítica</p>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-destructive bg-background p-4">
                  <p className="text-sm font-bold mb-3">Gestión de Administradores (Alta/Baja)</p>
                  <Button variant="destructive" className="w-full font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 transition-all">
                    ACCEDER A ROLES
                  </Button>
                </div>
                
                <div className="border-2 border-destructive bg-background p-4">
                  <p className="text-sm font-bold mb-3">Resetear Datos de Prueba</p>
                  <Button variant="outline" className="w-full border-2 border-destructive text-destructive font-black uppercase tracking-widest hover:bg-destructive hover:text-white">
                    PURGAR BASE
                  </Button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
