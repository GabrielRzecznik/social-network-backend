import PublicationRepository from '../repositories/publication.repository.js';

class PublicationService {
    async createPublication(id_user, content_publication, img_publication) {
        return PublicationRepository.createPublication({ id_user, content_publication, img_publication });
    }

    async updatePublication(id_publication, content_publication, img_publication) {
        const publicationData = await PublicationRepository.getPublicationById(id_publication);

        if (
            publicationData.content_publication === content_publication &&
            publicationData.img_publication === img_publication
        ) {
            throw new Error('No se realizaron cambios');
        }

        return PublicationRepository.updatePublication(id_publication, {
            content_publication, img_publication
        });
    }

    async updateStatusPublication(id_publication, status_publication) {
        const publication = await PublicationRepository.getPublicationById(id_publication);
        if (!publication) throw new Error('Publicación no encontrada');
        if (publication.status_publication === status_publication) throw new Error('El estado ya está actualizado');

        return PublicationRepository.updateStatusPublication(id_publication, status_publication);
    }
}

export default new PublicationService();