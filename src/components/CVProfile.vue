<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  LanguageIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  PrinterIcon,
  CalendarIcon,
  StarIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  LinkIcon,
  DocumentIcon,
  FolderIcon,
  ChevronRightIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/outline'

import perfilDataEs from "../locales/es.json"
import perfilDataEn from "../locales/en.json"

// CV Data - Cargar ambos idiomas
const cvDataEs = ref(perfilDataEs.perfil)
const cvDataEn = ref(perfilDataEn.perfil)
const currentLang = ref('es') // 'es' o 'en'

// Computed que devuelve el perfil según el idioma seleccionado
const perfil = computed(() => {
  return currentLang.value === 'es' ? cvDataEs.value : cvDataEn.value
})

// ✅ Función de redirección - CORREGIDA
const redirect = () => {
  window.open('https://cvpersonal-lyart.vercel.app/', '_blank')
}

const languages = computed(() => {
  const langObj = perfil.value["Lenguajes "]
  if (!langObj) return []
  return langObj.map(item => {
    const [key, value] = Object.entries(item)[0]
    return { name: key, level: value }
  })
})

// Toggle de idioma
const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'es' ? 'en' : 'es'
}

// Get color for skill level
const getSkillColor = (level) => {
  if (level >= 80) return 'success'
  if (level >= 60) return 'warning'
  return 'primary'
}

// Format date
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const parts = dateStr.split('/')
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return `${months[parseInt(parts[1]) - 1]} ${parts[0]}, ${parts[2]}`
}

// Get experience duration
const getDuration = (start, end) => {
  const startDate = new Date(start.split('/').reverse().join('-'))
  const endDate = new Date(end.split('/').reverse().join('-'))
  const diffTime = Math.abs(endDate - startDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const months = Math.floor(diffDays / 30)
  const days = diffDays % 30
  
  if (months > 0) {
    return `${months} mes${months > 1 ? 'es' : ''} ${days > 0 ? `y ${days} día${days > 1 ? 's' : ''}` : ''}`
  }
  return `${days} día${days > 1 ? 's' : ''}`
}

// Print function - mejorada para preservar enlaces
const printCV = () => {
  // Guardar referencia al documento actual
  const originalTitle = document.title
  document.title = 'CV_Franklim_Munoz'
  
  window.print()
  
  // Restaurar título después de imprimir
  setTimeout(() => {
    document.title = originalTitle
  }, 100)
}

// Función para abrir el certificado
const openCertificate = (certificado) => {
  if (!certificado) return
  
  if (certificado.startsWith('http')) {
    window.open(certificado, '_blank')
  } else {
    window.open(certificado, '_blank')
  }
}

// Función para abrir enlaces de proyectos
const openProject = (link) => {
  if (link) {
    window.open(link, '_blank')
  }
}
</script>

<template>
  <!-- ✅ Meta tag para preservar enlaces en PDF -->
  <div>
    <meta name="print" content="preserve-links">
    
    <div class="min-h-screen bg-base-200 p-4 md:p-8 print:p-0">
      <div class="max-w-5xl mx-auto">
        <!-- Botones de acción -->
        <div class="hidden-print flex flex-wrap items-center justify-end gap-2 mb-4 print:hidden">
          <!-- Toggle de idioma Español/Inglés -->
          <div class="flex items-center gap-2 bg-base-100 px-3 py-1.5 rounded-lg shadow-md border border-base-300">
            <span class="text-sm font-medium" :class="currentLang === 'es' ? 'text-primary' : 'text-base-content/50'">ES</span>
            <input 
              type="checkbox" 
              class="toggle toggle-primary toggle-sm" 
              :checked="currentLang === 'en'"
              @change="toggleLanguage"
            />
            <span class="text-sm font-medium" :class="currentLang === 'en' ? 'text-primary' : 'text-base-content/50'">EN</span>
          </div>
          
          <!-- Botón Imprimir -->
          <button class="btn btn-primary gap-2 shadow-lg" @click="printCV">
            <PrinterIcon class="w-5 h-5" />
            Imprimir / PDF
          </button>
        </div>

        <!-- CV Content -->
        <div class="bg-base-100 rounded-box shadow-2xl p-6 md:p-8 print:shadow-none print:rounded-none print:p-6">
          
          <!-- Header -->
          <div class="flex flex-col md:flex-row items-center gap-6 mb-6 pb-4 border-b-2 border-base-300 print:mb-4 print:pb-3">
            <div class="avatar">
              <div class="w-28 h-28 md:w-32 md:h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg print:w-24 print:h-24">
                <img :src="perfil.foto" :alt="perfil.nombre" class="object-cover" />
              </div>
            </div>
            <div class="flex-1 text-center md:text-left">
              <div class="badge badge-primary mb-1 print:badge-sm">{{ perfil.title }}</div>
              <h1 class="text-2xl md:text-3xl font-bold text-primary print:text-xl">{{ perfil.nombre }}</h1>
              <p class="text-sm text-base-content/70 mt-1 max-w-2xl print:text-xs">{{ perfil.Descripcion }}</p>
              
              <!-- Contacto -->
              <div class="flex flex-wrap gap-2 mt-2 justify-center md:justify-start print:gap-1 print:mt-1">
                <!-- ✅ ENLACE CORREGIDO Y FUNCIONAL EN PDF -->
                <a 
                  href="https://cvpersonal-lyart.vercel.app/" 
                  target="_blank" 
                  class="badge badge-outline badge-lg text-slate-400 print:badge-md hover:badge-primary transition-colors cursor-pointer"
                  rel="noopener noreferrer"
                >
                  <LinkIcon class="w-4 h-4 mr-1 print:w-3 print:h-3" />
                  {{ currentLang === 'es' ? 'Ver CV Online' : 'View Online CV' }}
                </a>
                
                <div v-for="(item, index) in perfil.contacto" :key="index" class="flex items-center gap-1 text-sm">
                  <span v-if="item.whatsapp" class="badge badge-outline badge-lg print:badge-md">
                    <PhoneIcon class="w-4 h-4 mr-1 print:w-3 print:h-3" />
                    {{ item.whatsapp }}
                  </span>
                  <span v-else-if="item.correo" class="badge badge-outline badge-lg print:badge-md">
                    <EnvelopeIcon class="w-4 h-4 mr-1 print:w-3 print:h-3" />
                    {{ item.correo }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Grid -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 print:gap-4">
            
            <!-- Left Column - Sidebar -->
            <div class="md:col-span-4 space-y-4 print:space-y-3">
              
              <!-- Lenguajes -->
              <div class="card bg-base-200 shadow-md print:shadow-none print:bg-gray-50">
                <div class="card-body p-4 print:p-3">
                  <h3 class="card-title text-sm uppercase tracking-wider text-primary gap-2 print:text-xs print:mb-2">
                    <LanguageIcon class="w-5 h-5 print:w-4 print:h-4" />
                    {{ currentLang === 'es' ? 'Lenguajes' : 'Languages' }}
                  </h3>
                  <div class="space-y-2 print:space-y-1">
                    <div v-for="lang in languages" :key="lang.name" class="space-y-0.5">
                      <div class="flex justify-between text-sm print:text-xs">
                        <span class="font-medium">{{ lang.name }}</span>
                        <span class="font-semibold text-primary">{{ lang.level }}%</span>
                      </div>
                      <progress class="progress print:progress-sm" :class="`progress-${getSkillColor(lang.level)}`" :value="lang.level" max="100"></progress>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ESTUDIOS -->
              <div class="card bg-base-200 shadow-md print:shadow-none print:bg-gray-50">
                <div class="card-body p-4 print:p-3">
                  <h3 class="card-title text-sm uppercase tracking-wider text-primary gap-2 print:text-xs print:mb-3">
                    <AcademicCapIcon class="w-5 h-5 print:w-4 print:h-4" />
                    {{ currentLang === 'es' ? 'Formación Académica' : 'Education' }}
                    <span class="badge badge-primary badge-sm ml-1">{{ perfil.Estudios.length }}</span>
                  </h3>
                  
                  <!-- Grid de estudios -->
                  <div class="grid grid-cols-1 gap-2 print:gap-1">
                    <div 
                      v-for="estudio in perfil.Estudios" 
                      :key="estudio.title" 
                      class="card bg-base-100 shadow-sm hover:shadow-md transition-all cursor-pointer print:shadow-none print:bg-white print:border print:border-gray-200"
                    >
                      <!-- ✅ Enlace funcional en PDF para certificados -->
                      <a 
                        v-if="estudio.certificado"
                        :href="estudio.certificado"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="card-body p-3 print:p-2 hover:bg-primary/5 transition-colors"
                      >
                        <div class="flex items-start gap-2">
                          <div class="badge badge-primary badge-sm mt-0.5 print:badge-xs">
                            {{ estudio.tipo.charAt(0).toUpperCase() }}
                          </div>
                          
                          <div class="flex-1 min-w-0">
                            <h4 class="font-semibold text-sm truncate print:text-xs">{{ estudio.title }}</h4>
                            <p class="text-xs text-base-content/60 capitalize print:text-[10px]">{{ estudio.tipo }}</p>
                          </div>
                          
                          <ArrowTopRightOnSquareIcon class="w-4 h-4 text-primary flex-shrink-0 print:w-3 print:h-3" />
                        </div>
                      </a>
                      
                      <!-- Sin certificado -->
                      <div v-else class="card-body p-3 print:p-2">
                        <div class="flex items-start gap-2">
                          <div class="badge badge-primary badge-sm mt-0.5 print:badge-xs">
                            {{ estudio.tipo.charAt(0).toUpperCase() }}
                          </div>
                          
                          <div class="flex-1 min-w-0">
                            <h4 class="font-semibold text-sm truncate print:text-xs">{{ estudio.title }}</h4>
                            <p class="text-xs text-base-content/60 capitalize print:text-[10px]">{{ estudio.tipo }}</p>
                          </div>
                          
                          <div class="w-4 h-4 text-base-content/30 flex-shrink-0 print:hidden">✕</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Main Content -->
            <div class="md:col-span-8 space-y-4 print:space-y-3">
              
              <!-- Experiencia -->
              <div class="card bg-base-200 shadow-md print:shadow-none print:bg-gray-50">
                <div class="card-body p-4 print:p-3">
                  <h3 class="card-title text-sm uppercase tracking-wider text-primary gap-2 print:text-xs print:mb-2">
                    <BriefcaseIcon class="w-5 h-5 print:w-4 print:h-4" />
                    {{ currentLang === 'es' ? 'Experiencia Profesional' : 'Professional Experience' }}
                  </h3>
                  <div class="space-y-3 print:space-y-2">
                    <div v-for="(exp, index) in perfil.experiencia" :key="index" class="border-l-4 border-primary pl-4 hover:bg-base-100 p-3 rounded-r-lg transition-colors print:hover:bg-transparent print:p-2 print:border-l-2">
                      <div class="flex flex-wrap justify-between items-start gap-2">
                        <h4 class="font-semibold text-base print:text-sm">{{ exp.nombre }}</h4>
                        <span class="badge badge-ghost badge-sm print:badge-xs print:text-[10px]">{{ exp.tipo }}</span>
                      </div>
                      <div class="flex flex-wrap items-center gap-2 text-xs text-base-content/60 mt-1 print:text-[10px] print:gap-1">
                        <CalendarIcon class="w-4 h-4 print:w-3 print:h-3" />
                        <span>{{ formatDate(exp.fecha.inicio) }} - {{ formatDate(exp.fecha.fin) }}</span>
                        <span class="badge badge-primary badge-sm print:badge-xs print:text-[10px]">{{ getDuration(exp.fecha.inicio, exp.fecha.fin) }}</span>
                      </div>
                      <p class="text-sm mt-2 text-base-content/80 print:text-xs">{{ exp.actividad }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Creaciones / Proyectos -->
              <div class="card bg-base-200 shadow-md print:shadow-none print:bg-gray-50">
                <div class="card-body p-4 print:p-3">
                  <h3 class="card-title text-sm uppercase tracking-wider text-primary gap-2 print:text-xs print:mb-2">
                    <CodeBracketIcon class="w-5 h-5 print:w-4 print:h-4" />
                    {{ currentLang === 'es' ? 'Proyectos Destacados' : 'Featured Projects' }}
                  </h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 print:gap-2">
                    <div v-for="creacion in perfil.creaciones" :key="creacion.title" class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:bg-white">
                      <!-- ✅ Enlace funcional en PDF para proyectos -->
                      <a 
                        :href="creacion.link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="card-body p-3 print:p-2 hover:bg-primary/5 transition-colors"
                      >
                        <h4 class="font-semibold text-sm flex items-center gap-1 print:text-xs">
                          <StarIcon class="w-4 h-4 text-primary print:w-3 print:h-3" />
                          {{ creacion.title }}
                        </h4>
                        <p class="text-xs text-base-content/60 line-clamp-2 print:text-[10px] print:line-clamp-none">{{ creacion.detalle }}</p>
                        <div class="link link-primary text-xs flex items-center gap-1 mt-1 hover:gap-2 transition-all print:text-[10px] print:no-underline">
                          <GlobeAltIcon class="w-3 h-3 print:w-2 print:h-2" />
                          {{ currentLang === 'es' ? 'Ver proyecto' : 'View project' }}
                          <span class="text-[10px]">→</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="mt-6 pt-3 border-t border-base-300 text-center text-xs text-base-content/50 print:mt-4 print:pt-2 print:text-[10px]">
            <p>© {{ new Date().getFullYear() }} - Franklim Muñoz | {{ currentLang === 'es' ? 'Desarrollador Junior' : 'Junior Developer' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.transition-colors {
  transition: background-color 0.2s ease;
}

.transition-shadow {
  transition: box-shadow 0.2s ease;
}

.transition-all {
  transition: all 0.2s ease;
}

.cursor-pointer {
  cursor: pointer;
}

.badge-lg {
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
}

.badge-outline {
  background: transparent;
}

/* Estilos para el toggle */
.toggle-sm {
  --togglehandleborder: 0 0 0 0;
  --toggle-padding: 2px;
  height: 1.2rem;
  width: 2rem;
}

.toggle-sm:checked {
  --tw-bg-opacity: 1;
  background-color: hsl(var(--p));
}

/* ✅ Estilo para que los enlaces en PDF se vean como enlaces */
a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media print {
  @page {
    size: A4;
    margin: 0.5cm;
  }

  .hidden-print {
    display: none !important;
  }
  
  .card {
    break-inside: avoid;
    page-break-inside: avoid;
    box-shadow: none !important;
    margin-bottom: 8px !important;
  }

  .card-body {
    padding: 10px !important;
  }

  .grid {
    gap: 12px !important;
  }

  .badge {
    font-size: 9px !important;
    padding: 1px 6px !important;
    min-height: 18px !important;
  }

  .badge-lg {
    font-size: 10px !important;
    padding: 3px 8px !important;
  }

  .badge-sm {
    font-size: 8px !important;
    padding: 1px 4px !important;
    min-height: 16px !important;
  }

  .badge-xs {
    font-size: 7px !important;
    padding: 0px 3px !important;
    min-height: 14px !important;
  }

  .badge-md {
    font-size: 9px !important;
    padding: 2px 6px !important;
    min-height: 16px !important;
  }

  .progress {
    height: 6px !important;
  }

  .progress-sm {
    height: 4px !important;
  }

  .badge,
  .progress,
  .avatar img,
  .ring-primary,
  .ring-offset-base-100 {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  .bg-base-100 {
    background-color: white !important;
  }

  .bg-base-200 {
    background-color: #f3f4f6 !important;
  }

  .text-primary {
    color: #2563eb !important;
  }

  .border-primary {
    border-color: #2563eb !important;
  }

  .link-primary {
    color: #2563eb !important;
  }

  .progress-success {
    background-color: #22c55e !important;
  }

  .progress-warning {
    background-color: #f59e0b !important;
  }

  .progress-primary {
    background-color: #2563eb !important;
  }

  .badge-primary {
    background-color: #2563eb !important;
    color: white !important;
  }

  .badge-ghost {
    background-color: #f1f5f9 !important;
    color: #334155 !important;
  }

  .badge-outline {
    border-color: #2563eb !important;
    color: #2563eb !important;
  }

  .ring-primary {
    --tw-ring-color: #2563eb !important;
  }

  .ring-offset-base-100 {
    --tw-ring-offset-color: white !important;
  }

  .line-clamp-2 {
    -webkit-line-clamp: unset !important;
    overflow: visible !important;
    display: block !important;
  }

  .text-base-content\/60 {
    color: #6b7280 !important;
  }

  .text-base-content\/80 {
    color: #1f2937 !important;
  }

  .text-base-content\/70 {
    color: #374151 !important;
  }

  .text-base-content\/50 {
    color: #9ca3af !important;
  }

  .space-y-4 > * + * {
    margin-top: 0.5rem !important;
  }

  .space-y-3 > * + * {
    margin-top: 0.4rem !important;
  }

  .space-y-2 > * + * {
    margin-top: 0.3rem !important;
  }

  .gap-6 {
    gap: 0.8rem !important;
  }

  .gap-4 {
    gap: 0.5rem !important;
  }

  .gap-3 {
    gap: 0.3rem !important;
  }

  .gap-2 {
    gap: 0.2rem !important;
  }

  .p-4 {
    padding: 0.8rem !important;
  }

  .p-3 {
    padding: 0.5rem !important;
  }

  .p-2 {
    padding: 0.3rem !important;
  }

  .mb-6 {
    margin-bottom: 0.4rem !important;
  }

  .mb-4 {
    margin-bottom: 0.3rem !important;
  }

  .mt-2 {
    margin-top: 0.2rem !important;
  }

  .mt-1 {
    margin-top: 0.1rem !important;
  }

  .pb-4 {
    padding-bottom: 0.3rem !important;
  }

  .avatar .w-32 {
    width: 80px !important;
    height: 80px !important;
  }

  .avatar .w-28 {
    width: 70px !important;
    height: 70px !important;
  }

  /* ✅ Asegurar que los enlaces sean visibles en el PDF */
  a {
    text-decoration: none !important;
    color: #000 !important;
  }

  a[href] {
    text-decoration: none !important;
    color: #000 !important;
  }

  .card-body a {
    display: block !important;
  }
}

@media (max-width: 640px) {
  .flex-wrap {
    gap: 0.5rem;
  }
  
  .btn {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
  
  .toggle-sm {
    height: 1rem;
    width: 1.8rem;
  }
}
</style>
