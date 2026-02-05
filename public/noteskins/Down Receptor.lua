local player = Var "Player";
local start=0;
local mem_song; 
-- [ja] 現在のビートを取得する（譜面で異なるものに対応）
function GetPlayerSongBeat(player)
	local csteps=GAMESTATE:GetCurrentSteps(player);
	local timing=csteps:GetTimingData();
	return timing:GetBeatFromElapsedTime(GAMESTATE:GetSongPosition():GetMusicSeconds());
end;

local t = Def.ActorFrame {
	LoadActor(NOTESKIN:GetPath( '_down', 'Receptor' ))..{
		Name="Receptor";
		InitCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'InitCommand');
		NoneCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
		OnCommand=function(self)
			self:animate(false);
			self:setstate(2);
		end;
	};
	--[[
	Def.Sprite {
		Texture=NOTESKIN:GetPath( '_down', 'Receptor' );
		Frame0000=0;
		Delay0000=0.1;
		Frame0001=1;
		Delay0001=0.8;
		Frame0002=0;
		Delay0002=0.1;
		InitCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'InitCommand');
		NoneCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
	};
	--]]
};
local function update(self)
	local song=GAMESTATE:GetCurrentSong();
	if song and mem_song~=song then
		start=song:GetFirstBeat()-8.0;
		mem_song=song;
	end;
	local rec = self:GetChild("Receptor");
	local now=GetPlayerSongBeat(player);
	local beat=(now*10)%10;
	if now>=start then
		if beat>=1 and beat<9 then
			rec:setstate(1);
		else
			rec:setstate(0);
		end;
	else
		rec:setstate(2);
	end;
end;
t.InitCommand=cmd(SetUpdateFunction,update;);
return t;
