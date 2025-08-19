import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Calendar, Zap, TrendingUp, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-workflow.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Personal Energy Mapping",
      description: "AI learns your natural energy patterns to optimize task placement"
    },
    {
      icon: Calendar,
      title: "Adaptive Scheduling",
      description: "Tasks automatically reschedule based on real-time changes and delays"
    },
    {
      icon: Zap,
      title: "Smart Break Optimizer", 
      description: "Intelligent nudges for rest, hydration, and focus breaks"
    },
    {
      icon: TrendingUp,
      title: "Productivity Analytics",
      description: "Daily insights with completion rates and energy alignment scores"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "Finally, a scheduler that understands when I'm actually productive. My focus time has improved 40%!"
    },
    {
      name: "Marcus Rodriguez", 
      role: "Software Developer",
      content: "The AI-powered insights helped me identify my peak coding hours. Game changer for my workflow."
    },
    {
      name: "Emily Davis",
      role: "UX Designer", 
      content: "Love how it suggests breaks right when I need them. No more afternoon crashes!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-energy opacity-10" />
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  AI-Powered Workflow That
                  <span className="bg-gradient-energy bg-clip-text text-transparent"> Adapts</span> 
                  to You
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  An intelligent scheduler that aligns tasks with your energy, keeps you focused, 
                  and helps you achieve more without burning out.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth')}
                  className="text-lg px-8 py-4 bg-gradient-focus hover:shadow-glow transition-all duration-300"
                >
                  Proceed
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-4 border-primary/50 hover:border-primary transition-colors"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>10k+ Users</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Privacy First</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>AI-Powered</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-energy opacity-20 rounded-2xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="Smart Workflow Dashboard"
                className="relative z-10 rounded-2xl shadow-2xl animate-pulse-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Intelligent Features for Peak Productivity
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed to understand your unique work patterns and adapt accordingly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-primary transition-all duration-300 animate-fade-in">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-energy p-3 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Loved by Productive People
            </h2>
            <p className="text-xl text-muted-foreground">
              See how others transformed their workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-energy transition-all duration-300">
                <CardContent className="p-6">
                  <p className="text-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-energy">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Optimize Your Workflow?
          </h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their productivity 
            with AI-powered scheduling
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="text-lg px-12 py-4 bg-background text-foreground hover:bg-background/90 hover:shadow-2xl transition-all duration-300"
          >
            Start Optimizing
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
