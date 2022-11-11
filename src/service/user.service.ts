import { LoginDTO, RegisterDTO } from '@/dto/user'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@/entity/user.entity'
import { Repository } from 'typeorm'
import { encryptPassword, makeSalt } from '@/utils/cryptogram'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}
  // 注册
  async register(registerDTO: RegisterDTO): Promise<any> {
    await this.checkRegisterForm(registerDTO)
    const { username, password } = registerDTO
    const salt = makeSalt() //生成随机密码盐
    const hashPassword = encryptPassword(password, salt) // 加密密码

    const newUser: User = new User()
    newUser.username = username
    newUser.password = hashPassword
    newUser.salt = salt
    const user = await this.userRepository.save(newUser)
    if (user) {
      const token = await this.createToken(user)
      const userInfo = await this.getUserInfo(user.uuid)
      return {
        info: token,
        user: userInfo
      }
    }
  }
  // 校验注册信息
  async checkRegisterForm(registerDTO: RegisterDTO): Promise<any> {
    if (registerDTO.password !== registerDTO.passwordRepeat) {
      throw new NotFoundException('两次输入的密码不一致，请检查')
    }
    const { username } = registerDTO
    const hasUser = await this.userRepository.findOneBy({ username })
    if (hasUser) {
      throw new NotFoundException('用户已存在')
    }
  }
  // 获取用户信息
  async getUserInfo(userId: string): Promise<any> {
    console.log(1111)
    const userInfo = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.authorities', 'authority')
      .where('user.uuid = :userId', { userId })
      .getOne()
    const { createTime, updateTime, id, mobile, username, uuid, nickname, version, authorities } =
      userInfo
    return {
      createTime,
      updateTime,
      id,
      mobile,
      username,
      uuid,
      nickname,
      version,
      authority: authorities[0]
    }
  }
  // 登录校验用户信息
  async checkLoginForm(loginDTO: LoginDTO): Promise<User> {
    const { username, password } = loginDTO
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne()
    if (!user) {
      throw new NotFoundException('用户不存在')
    }
    const { password: dbPassword, salt } = user
    const currentHashPassword = encryptPassword(password, salt)
    if (currentHashPassword != dbPassword) {
      throw new NotFoundException('密码错误')
    }
    return user
  }
  // 创建token
  async createToken(user: User): Promise<string> {
    const playload = {
      id: user.id,
      username: user.username,
      uuid: user.uuid
    }
    const token = this.jwtService.sign(playload)
    return token
  }
  // 登录
  async login(loginDTO: LoginDTO): Promise<any> {
    const user = await this.checkLoginForm(loginDTO)
    const token = await this.createToken(user)
    const userInfo = await this.getUserInfo(user.uuid)
    return {
      info: token,
      user: userInfo
    }
  }
}
