/**
 * artiste controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::artiste.artiste', ({ strapi }) => ({
  async find(ctx) {
    // S'assurer que ctx.query.filters est un objet avec assertion de type
    const filters = (ctx.query?.filters || {}) as Record<string, any>;

    // Ajouter le filtre pour les artistes publiés
    ctx.query = {
      ...ctx.query,
      filters: {
        ...filters,
        dateDePublication: {
          $lte: new Date().toISOString(),
        },
      },
    };

    // Appeler la méthode find par défaut
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
}));
