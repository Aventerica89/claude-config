import { motion } from 'framer-motion';

const integrations = [
  { name: 'GitHub', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z', color: '#ffffff' },
  { name: '1Password', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z', color: '#0094F5' },
  { name: 'Vercel', icon: 'M12 1L24 22H0L12 1z', color: '#ffffff' },
  { name: 'Cloudflare', icon: 'M16.5 12.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-9 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z', color: '#F6821F' },
  { name: 'Supabase', icon: 'M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642l-.113-7.509z', color: '#3ECF8E' },
  { name: 'Claude', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', color: '#D97706' },
  { name: 'VS Code', icon: 'M17.583 2.246l-4.35 4.177L8.9 3.05.417 9.65v4.7l4.1-3.128 8.733 6.528 4.35-4.177v-11.327h-.017zM4.517 13.622l4.35-3.328-4.35-3.294v6.622zm8.333.65l4.35-3.294-4.35-3.328v6.622z', color: '#007ACC' },
];

const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {integrations.map((integration, index) => {
        const angle = (index / integrations.length) * 2 * Math.PI;
        const radius = 280;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.6;

        return (
          <motion.div
            key={integration.name}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: x,
              y: y,
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="w-14 h-14 rounded-xl bg-secondary/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer group">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7"
                  fill={integration.color}
                >
                  <path d={integration.icon} />
                </svg>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs text-muted-foreground bg-background/90 px-2 py-1 rounded">
                  {integration.name}
                </div>
              </div>
              <div
                className="absolute inset-0 rounded-xl opacity-30 blur-xl"
                style={{ backgroundColor: integration.color }}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingIcons;
