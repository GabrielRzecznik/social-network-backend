import FollowRepository from '../repositories/follow.repository.js';
import CustomError from '../utils/customError.util.js';

class FollowService {
    async addFollow(id_user1, id_user2) {
        const follow = await this.findFollowId(id_user1, id_user2);
        if (follow && follow.status === 0) {
            const id_follow = follow.id_follow;
            const result = this.updateStatusFollow(id_follow, 1);
            
            return res.status(200).json({ message: 'Follow reactivado exitosamente', follow: result });
        }else if (follow && follow.status === 1) {
            return res.status(500).json({ message: 'El usuario ya sigues al otro usuario' });
        }
        
        return FollowRepository.addFollow(id_user1, id_user2);
    }
    
    async findFollowId(id_user1, id_user2) {
        const follow = await FollowRepository.findFollowId(id_user1, id_user2);
        if (follow) throw new CustomError('Ya sigues a este usuario', 400);
        return follow;
    }

    async updateStatusFollow(id_follow, status) {
        const follow = await this.getFollowById(id_follow);
        if (follow.status !== status) return FollowRepository.updateStatusFollow(id_follow, status);
        else throw new CustomError('Follow sin cambios', 400);
    }

    async getFollowById(id_follow) {
        const follow = await FollowRepository.getFollowById(id_follow);
        if (!follow) throw new CustomError('Follow no encontrado', 400);
        return follow;
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