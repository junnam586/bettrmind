import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Plus, Search, Users, TrendingUp } from "lucide-react";

const GetCopiedHub = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-black">Get Copied</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create winning bets, share them with the community, and earn commission when others copy your picks
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link to="/create-bet">
            <Card className="bg-white border-gray-200 hover:border-gray-400 transition-all cursor-pointer h-full group shadow-sm hover:shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                  <Plus className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-black">Create Bet</h3>
                <p className="text-gray-600 mb-4">
                  Build custom bets with your picks and set your commission rate
                </p>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                  Start Creating
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/browse-bets">
            <Card className="bg-white border-gray-200 hover:border-gray-400 transition-all cursor-pointer h-full group shadow-sm hover:shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                  <Search className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-black">Browse & Copy</h3>
                <p className="text-gray-600 mb-4">
                  Discover winning bets from top creators and copy them instantly
                </p>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                  Browse Bets
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/my-copiers">
            <Card className="bg-white border-gray-200 hover:border-gray-400 transition-all cursor-pointer h-full group shadow-sm hover:shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                  <Users className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-black">My Copiers</h3>
                <p className="text-gray-600 mb-4">
                  Track who's copying your bets and monitor your earnings
                </p>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                  View Dashboard
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* How It Works */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-black">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  1
                </div>
                <h3 className="font-bold mb-2 text-black">Create Your Bet</h3>
                <p className="text-sm text-gray-600">
                  Build your bet across NFL, NBA, MLB, NHL, UFC, Soccer. Set your tip percentage (5-20%).
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  2
                </div>
                <h3 className="font-bold mb-2 text-black">Share & Get Copied</h3>
                <p className="text-sm text-gray-600">
                  Other users discover your bet and copy it with their own wager amounts
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  3
                </div>
                <h3 className="font-bold mb-2 text-black">Earn Commission</h3>
                <p className="text-sm text-gray-600">
                  When others copy your bet, they see and pay your required tip percentage upfront.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GetCopiedHub;
