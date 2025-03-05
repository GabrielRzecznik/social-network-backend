import PublicationRepository from '../repositories/publication.repository.js';

class PublicationService {
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
}

export default new PublicationService();