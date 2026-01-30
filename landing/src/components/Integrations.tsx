import { motion } from 'framer-motion';
import { Badge } from './ui/badge';

const integrations = [
  {
    name: 'GitHub',
    description: 'Source control, PRs, issues',
    icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
    color: '#ffffff',
  },
  {
    name: '1Password',
    description: 'Secrets & API keys',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z',
    color: '#0094F5',
  },
  {
    name: 'Vercel',
    description: 'Deployments & hosting',
    icon: 'M12 1L24 22H0L12 1z',
    color: '#ffffff',
  },
  {
    name: 'Cloudflare',
    description: 'Workers, KV, R2, D1',
    icon: 'M16.5093 16.3146L16.8478 14.3439C16.9306 13.8727 16.9038 13.4653 16.7685 13.1217C16.5714 12.6192 16.2083 12.2754 15.6796 12.0902C15.3893 11.9854 15.0703 11.9387 14.7225 11.9499L7.43909 12.0396C7.35523 12.0421 7.28168 12.0087 7.22891 11.9518C7.18163 11.9013 7.15842 11.8365 7.16315 11.7679L7.22422 11.2814C7.24049 11.1541 7.35097 11.0555 7.48463 11.0469L14.8358 10.9534C15.3976 10.9359 15.9325 10.8448 16.4404 10.6798C17.5583 10.3189 18.3958 9.56858 18.9524 8.4289C19.2038 7.9124 19.3807 7.33863 19.4829 6.70765C19.5034 6.58232 19.4465 6.46049 19.3396 6.39643C18.9011 6.12981 18.3985 5.98671 17.8316 5.96718L5.60202 5.96992C5.37174 5.9683 5.14981 6.04836 4.97706 6.19653C4.8052 6.34445 4.69256 6.54996 4.66144 6.77325L3.00094 17.7311C2.95366 18.054 3.19902 18.3413 3.53103 18.3413H7.56066L8.79904 10.6636C8.82584 10.4903 8.9363 10.3398 9.09709 10.2599C9.25735 10.1805 9.44775 10.1813 9.60716 10.2624C9.69157 10.3062 9.76297 10.3711 9.81563 10.4515C9.86772 10.531 9.90018 10.623 9.9099 10.7188L9.90839 10.8193L8.69263 18.3413H12.0174L13.2167 10.7764C13.2399 10.6269 13.333 10.4962 13.469 10.4228C13.6046 10.3497 13.7679 10.3413 13.9107 10.4004C14.0002 10.4386 14.0779 10.4995 14.1358 10.5767C14.1941 10.6544 14.2304 10.7461 14.2414 10.8424L14.2353 10.9193L13.0424 18.3413H17.0721C17.3933 18.3413 17.6598 18.1103 17.6958 17.7961L17.8584 16.6095C17.8829 16.4302 17.7369 16.2781 17.5501 16.3078L16.9158 16.4135C16.7328 16.4426 16.5819 16.2893 16.5093 16.3146Z',
    color: '#F6821F',
  },
  {
    name: 'Supabase',
    description: 'Database & auth',
    icon: 'M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642l-.113-7.509z',
    color: '#3ECF8E',
  },
  {
    name: 'Claude AI',
    description: 'Anthropic AI assistant',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    color: '#D97706',
  },
  {
    name: 'VS Code',
    description: 'Editor integration',
    icon: 'M17.583 2.246L13.233 6.423 8.9 3.05.417 9.65v4.7l4.1-3.128 8.733 6.528 4.35-4.177V2.246h-.017zM4.517 13.622l4.35-3.328-4.35-3.294v6.622zm8.333.65l4.35-3.294-4.35-3.328v6.622z',
    color: '#007ACC',
  },
  {
    name: 'Railway',
    description: 'Deployment platform',
    icon: 'M2.5 10a.5.5 0 0 0 0 1h3.797a.5.5 0 0 0 .453-.29l.957-2.034a.5.5 0 0 0-.453-.71H4.5a.5.5 0 0 0-.453.29L2.59 10.29a.5.5 0 0 0 .91.42l1.5-3.18a.5.5 0 0 1 .453-.29h3.044a.5.5 0 0 1 .453.71l-.957 2.034a.5.5 0 0 1-.453.29H4.747a.5.5 0 0 1-.453-.71l.957-2.034a.5.5 0 0 1 .453-.29H9.5a.5.5 0 0 0 0-1H5.704a.5.5 0 0 0-.453.29l-.957 2.034a.5.5 0 0 0 .453.71h2.796a.5.5 0 0 0 .453-.29l.957-2.034a.5.5 0 0 0-.453-.71H4.704a.5.5 0 0 0-.453.29L2.794 9.29a.5.5 0 0 0 .453.71H6.5',
    color: '#0B0D0E',
  },
];

const Integrations = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4">
            Integrations
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Works With Your Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pre-configured MCP servers and CLI tools for seamless integration.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.05 }}
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-violet-500/50 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${integration.color}15` }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill={integration.color}>
                  <path d={integration.icon} />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-violet-400 transition-colors">
                {integration.name}
              </h3>
              <p className="text-sm text-muted-foreground">{integration.description}</p>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${integration.color}10 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Integrations;
