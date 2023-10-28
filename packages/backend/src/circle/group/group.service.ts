import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/user.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, createGroupDto: CreateGroupDto) {
    const user = await this.userService.findById(userId);

    const group = new Group();
    group.name = createGroupDto.name;
    group.description = createGroupDto.description;
    group.users = [user];

    const savedGroup = await this.groupRepository.save(group);
    return this.findOne(savedGroup.groupId);
  }

  findAll() {
    return this.groupRepository.find();
  }

  findOne(id: number) {
    return this.groupRepository.findOne({
      where: { groupId: id },
      relations: { users: true },
    });
  }

  findAllByUserId(userId: number) {
    return this.groupRepository.findBy({ users: { userId: userId } });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const currentGroup = await this.findOne(id);
    const newUsers = (await this.userService.findAll()).filter((user) =>
      updateGroupDto.userIds.includes(user.userId),
    );
    const allUsers = currentGroup.users.concat(newUsers);

    const newGroup = new Group();
    newGroup.groupId = currentGroup.groupId;
    newGroup.name = currentGroup.name;
    newGroup.description = currentGroup.description;
    newGroup.users = allUsers;
    return this.groupRepository.save(newGroup);
  }

  remove(id: number) {
    return this.groupRepository.delete(id);
  }
}
