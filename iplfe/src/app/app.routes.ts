import { Routes } from '@angular/router';
import { ElevenComponent } from './eleven/eleven.component';
import { AuctionComponent } from './auction/auction.component';
import { RulesComponent } from './rules/rules.component';
import { StatsComponent } from './stats/stats.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

export const routes: Routes = [
    {path: "", component: AuctionComponent},
    {path: "squad", component: AuctionComponent},
    {path: "team", component: ElevenComponent},
    {path: "rules", component: RulesComponent},
    {path: "stats", component: StatsComponent},
    {path: "leaderboard", component: LeaderboardComponent},
    {path: "authentication", component: AuthenticationComponent},
    {path: "verifyemail", component: VerifyEmailComponent}
];
