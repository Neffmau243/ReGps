import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">GPS</span>
              </div>
              <div>
                <h3 className="text-white">TrackPro</h3>
                <p className="text-neutral-400 text-xs">Sistema de Rastreo GPS</p>
              </div>
            </div>
            <p className="text-neutral-400 text-sm">
              Solución integral para el monitoreo y gestión de dispositivos GPS en tiempo real.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-neutral-400">
                <Mail className="h-4 w-4 text-orange-500" />
                <span>contacto@trackpro.com</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Phone className="h-4 w-4 text-orange-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span>Ciudad de México, México</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white mb-4">Enlaces Rápidos</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-neutral-400 hover:text-orange-500 transition-colors">
                Documentación
              </a>
              <a href="#" className="block text-neutral-400 hover:text-orange-500 transition-colors">
                Soporte Técnico
              </a>
              <a href="#" className="block text-neutral-400 hover:text-orange-500 transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="block text-neutral-400 hover:text-orange-500 transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
          <p className="text-neutral-400 text-sm">
            © 2025 TrackPro. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
