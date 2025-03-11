import FollowRepository from '../repositories/follow.repository.js';

class FollowService {
    async addFollow(id_user1, id_user2) {
        const follow = await this.findFollowId(id_user1, id_user2);
        
        if (follow && follow.status === 0) {
            const id_follow = follow.id_follow;
            const result = this.toggleStatusFollow(id_follow, 1);
            
            return res.status(200).json({ message: 'Follow reactivado exitosamente', follow: result });
        }else if (follow && follow.status === 1) {
            return res.status(500).json({ message: 'El usuario ya sigues al otro usuario' });
        }
        
        return FollowRepository.addFollow(id_user1, id_user2);
    }
    
    async findFollowId(id_user1, id_user2) {
        return FollowRepository.findFollowId(id_user1, id_user2);
    }

    async statusFollow(id_follow, status) {
        const follow = await this.getFollowById(id_follow);

        if (follow.status !== status) {
            return this.toggleStatusFollow(id_follow, status);
        }else {
            return res.status(500).json({ message: 'Follow sin modificaciones' });
        }
    }

    async toggleStatusFollow(id_follow, status){
        return FollowRepository.toggleStatusFollow(id_follow, status);
    }

    async getFollowById(id_follow) {
        const follow = await FollowRepository.getFollowById(id_follow);

        if (!follow) {
            return res.status(404).json({ message: 'Follow no encontrado' });
        }
    }

    async getFollowsCount(id_user) {
        return FollowRepository.getFollowsCount(id_user);
    }

    async getFollowers(id_user) {
        return FollowRepository.getFollowers(id_user);
    }

    async getFollowings(id_user) {
        return FollowRepository.getFollowings(id_user);
    }
}

export default new FollowService();