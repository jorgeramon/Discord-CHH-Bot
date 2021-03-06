import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { ITwitchGame } from '@twitch/interface/twitch-game.interface';
import { ITwitchSubscription } from '@twitch/interface/twitch-subscription.interface';
import { TwitchService } from '@twitch/service/twitch.service';
import { IUser } from '@user/interface/user.interface';
import { UserService } from '@user/service/user.service';

@Controller('twitch')
export class TwitchController {
  constructor(
    private readonly twitchService: TwitchService,
    private readonly userService: UserService,
  ) {}

  @Get()
  helloWorld(): string {
    return 'Hello World!';
  }

  @Get('subscriptions')
  getSubscriptions(): Promise<ITwitchSubscription[]> {
    return this.twitchService.fetchCurrentSubscriptions();
  }

  @Get('games')
  getGames(@Query('name') name: string): Promise<ITwitchGame> {
    return this.twitchService.fetchGames(name);
  }

  @Delete('subscriptions/:id')
  async deleteSubscription(@Param('id') id: string): Promise<string> {
    await this.twitchService.deleteSubscription(id);
    return `Deleted subscription with id ${id}`;
  }

  @Delete('subscriptions')
  async deleteSubscriptions(): Promise<string> {
    const subscriptions = await this.twitchService.fetchCurrentSubscriptions();

    await Promise.all(
      subscriptions.map((subscription: ITwitchSubscription) =>
        this.deleteSubscription(subscription.id),
      ),
    );

    return `Deleted ${subscriptions.length} subscriptions`;
  }

  @Put('subscriptions')
  async updateSubscriptions(): Promise<string> {
    const subscriptions = await this.twitchService.fetchCurrentSubscriptions();

    await Promise.all(
      subscriptions.map((subscription: ITwitchSubscription) =>
        this.deleteSubscription(subscription.id),
      ),
    );

    const users: IUser[] = await this.userService.findWithTwitchAccount();

    await Promise.all(
      users.map((user) => this.twitchService.createSubscription(user.twitchId)),
    );

    return `Updated ${users.length} subscriptions`;
  }
}
