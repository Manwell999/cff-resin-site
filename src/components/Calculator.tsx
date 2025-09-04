"use client";

import { useMemo, useState } from "react";

type ProjectType = "Floor Coating" | "Epoxy Table" | "Countertop" | "Art/Casting Project" | "Garage Floor" | "Commercial Space" | "Basement Floor";
type FinishType = "Clear Coat" | "Metallic Epoxy" | "Decorative Flake" | "Solid Color" | "Quartz Broadcast" | "Terrazzo Style";
type Substrate = "Concrete" | "Wood" | "Metal" | "Existing Coating" | "Plywood";
type Surface = "New/Excellent" | "Good (Minor prep needed)" | "Fair (Moderate prep needed)" | "Poor (Extensive prep needed)" | "Damaged (Repair required)";
type Temperature = "Cold (50-65°F)" | "Normal (65-75°F)" | "Warm (75-85°F)" | "Hot (85°F+)";
type Humidity = "Low (0-40%)" | "Normal (40-60%)" | "High (60-80%)" | "Very High (80%+)";
type Traffic = "Light (Residential)" | "Medium (Light Commercial)" | "Heavy (Commercial)" | "Industrial (Heavy Duty)";

const finishPricePerGallon: Record<FinishType, number> = {
  "Clear Coat": 95,
  "Metallic Epoxy": 120,
  "Decorative Flake": 110,
  "Solid Color": 100,
  "Quartz Broadcast": 130,
  "Terrazzo Style": 140,
};

const substrateMultiplier: Record<Substrate, number> = {
  Concrete: 1.0,
  Wood: 1.05,
  Metal: 1.1,
  "Existing Coating": 0.95,
  Plywood: 1.05,
};

const surfacePrepCostPerSqFt: Record<Surface, number> = {
  "New/Excellent": 0,
  "Good (Minor prep needed)": 0.5,
  "Fair (Moderate prep needed)": 1.0,
  "Poor (Extensive prep needed)": 2.0,
  "Damaged (Repair required)": 3.5,
};

const trafficMultiplier: Record<Traffic, number> = {
  "Light (Residential)": 1.0,
  "Medium (Light Commercial)": 1.05,
  "Heavy (Commercial)": 1.1,
  "Industrial (Heavy Duty)": 1.2,
};

function coverageSqFtPerGallon(thicknessInches: number): number {
  if (thicknessInches <= 0) return 0;
  return 1.604 / thicknessInches; // 1 gal @ 1/8" ≈ 12.8 sq ft
}

export default function Calculator() {
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [finishType, setFinishType] = useState<FinishType | "">("");
  const [lengthFt, setLengthFt] = useState<number>(0);
  const [widthFt, setWidthFt] = useState<number>(0);
  const [thicknessIn, setThicknessIn] = useState<number>(0.125);
  const [substrate, setSubstrate] = useState<Substrate | "">("");
  const [surface, setSurface] = useState<Surface | "">("");
  const [temperature, setTemperature] = useState<Temperature | "">("");
  const [humidity, setHumidity] = useState<Humidity | "">("");
  const [traffic, setTraffic] = useState<Traffic | "">("");
  const [includeTools, setIncludeTools] = useState(false);
  const [includeSealer, setIncludeSealer] = useState(false);
  const [rush, setRush] = useState(false);

  const areaSqFt = useMemo(() => Math.max(0, lengthFt) * Math.max(0, widthFt), [lengthFt, widthFt]);
  const coverage = useMemo(() => coverageSqFtPerGallon(Math.max(thicknessIn, 0.001)), [thicknessIn]);
  const gallons = useMemo(() => (coverage > 0 ? areaSqFt / coverage : 0), [areaSqFt, coverage]);

  const envMultiplier = useMemo(() => {
    let mult = 1;
    if (temperature === "Cold (50-65°F)" || temperature === "Hot (85°F+)") mult *= 1.05;
    if (humidity === "Very High (80%+)") mult *= 1.05;
    return mult;
  }, [temperature, humidity]);

  const result = useMemo(() => {
    const basePrice = finishType ? finishPricePerGallon[finishType] : 0;
    const substrateMult = substrate ? substrateMultiplier[substrate] : 1;
    const trafficMult = traffic ? trafficMultiplier[traffic] : 1;
    const prepCost = surface ? surfacePrepCostPerSqFt[surface] * areaSqFt : 0;

    const resinCost = gallons * basePrice * substrateMult * trafficMult;

    const sealerGallons = includeSealer ? areaSqFt / 400 : 0; // ~400 sq ft/gal
    const sealerPrice = 80;
    const sealerCost = sealerGallons * sealerPrice;

    const toolsCost = includeTools ? 60 : 0;

    let subtotal = (resinCost + sealerCost + toolsCost + prepCost) * envMultiplier;
    if (rush) subtotal *= 1.15;

    return {
      gallons: Math.max(0, gallons),
      areaSqFt,
      sealerGallons,
      estimatedCost: Math.max(0, subtotal),
    };
  }, [finishType, substrate, traffic, surface, areaSqFt, gallons, includeSealer, includeTools, envMultiplier, rush]);

  return (
    <section className="mt-24" id="calculator">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight gradient-resin-text">Material Calculator</h2>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl ring-1 ring-resin-blue/20 p-6 bg-white/5 resin-glow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm opacity-80">Project Type</label>
                <select className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" value={projectType} onChange={e => setProjectType(e.target.value as ProjectType | "")}> 
                  <option value="">Select Project Type...</option>
                  {(["Floor Coating","Epoxy Table","Countertop","Art/Casting Project","Garage Floor","Commercial Space","Basement Floor"] as const).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm opacity-80">Finish Type</label>
                <select className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" value={finishType} onChange={e => setFinishType(e.target.value as FinishType | "")}> 
                  <option value="">Select Finish...</option>
                  {Object.keys(finishPricePerGallon).map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm opacity-80">Length (feet)</label>
                <input type="number" min={0} className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" value={lengthFt} onChange={e => setLengthFt(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-sm opacity-80">Width (feet)</label>
                <input type="number" min={0} className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" value={widthFt} onChange={e => setWidthFt(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-sm opacity-80">Thickness (inches)</label>
                <select className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" value={thicknessIn} onChange={e => setThicknessIn(Number(e.target.value))}>
                  <option value={0.125}>1/8&quot; (Standard)</option>
                  <option value={0.25}>1/4&quot; (Heavy Duty)</option>
                  <option value={0.5}>1/2&quot; (Ultra Thick)</option>
                  <option value={1}>1&quot; (Thick Pour)</option>
                  <option value={2}>2&quot; (Deep Pour)</option>
                </select>
              </div>
              <div>
                <label className="text-sm opacity-80">Substrate Type</label>
                <select className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" value={substrate} onChange={e => setSubstrate(e.target.value as Substrate | "")}> 
                  <option value="">Select...</option>
                  {(["Concrete","Wood","Metal","Existing Coating","Plywood"] as const).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm opacity-80">Surface Condition</label>
                <select className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" value={surface} onChange={e => setSurface(e.target.value as Surface | "")}> 
                  <option value="">Select...</option>
                  {(["New/Excellent","Good (Minor prep needed)","Fair (Moderate prep needed)","Poor (Extensive prep needed)","Damaged (Repair required)"] as const).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm opacity-80">Temperature (°F)</label>
                <select className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" value={temperature} onChange={e => setTemperature(e.target.value as Temperature | "")}> 
                  <option value="">Select...</option>
                  {(["Cold (50-65°F)","Normal (65-75°F)","Warm (75-85°F)","Hot (85°F+)"] as const).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm opacity-80">Humidity Level</label>
                <select className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" value={humidity} onChange={e => setHumidity(e.target.value as Humidity | "")}> 
                  <option value="">Select...</option>
                  {(["Low (0-40%)","Normal (40-60%)","High (60-80%)","Very High (80%+)"] as const).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm opacity-80">Expected Traffic</label>
                <select className="mt-1 w-full rounded-md bg-transparent ring-1 ring-resin-blue/30 px-3 py-2 focus:ring-resin-blue focus:outline-none transition-colors" value={traffic} onChange={e => setTraffic(e.target.value as Traffic | "")}> 
                  <option value="">Select...</option>
                  {(["Light (Residential)","Medium (Light Commercial)","Heavy (Commercial)","Industrial (Heavy Duty)"] as const).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={includeTools} onChange={e => setIncludeTools(e.target.checked)} /> Include basic tools</label>
              <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={includeSealer} onChange={e => setIncludeSealer(e.target.checked)} /> Include topcoat sealer</label>
              <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={rush} onChange={e => setRush(e.target.checked)} /> Rush delivery (+15%)</label>
            </div>
          </div>

          <div className="rounded-2xl ring-1 ring-resin-blue/20 p-6 bg-gradient-to-br from-resin-blue/10 via-resin-blue-light/10 to-resin-blue-bright/10 resin-glow">
            <h3 className="font-medium">Your Material List</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span>Project Area:</span><span>{areaSqFt.toFixed(0)} sq ft</span></div>
              <div className="flex justify-between"><span>Total Volume:</span><span>{result.gallons.toFixed(2)} gallons</span></div>
              {includeSealer && (
                <div className="flex justify-between"><span>Topcoat Sealer:</span><span>{result.sealerGallons.toFixed(2)} gallons</span></div>
              )}
              <div className="flex justify-between text-base font-semibold pt-3 border-t border-white/10"><span>Estimated Cost:</span><span>${result.estimatedCost.toFixed(2)}</span></div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3">
              <button className="rounded-full px-5 py-3 bg-resin-blue text-white hover:bg-resin-blue-light transition-colors resin-glow">Add All to Cart</button>
              <button className="rounded-full px-5 py-3 border border-resin-blue/30 hover:bg-resin-blue/10 transition-colors">Get Professional Quote</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


