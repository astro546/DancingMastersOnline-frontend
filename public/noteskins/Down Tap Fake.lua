return Def.Sprite {
	Texture=NOTESKIN:GetPath( '_down', 'tap note' );
	Frames = Sprite.LinearFrames( 16, 1 );
	InitCommand=cmd(setstate,2);
	DrawTapNoteMessageCommand=function(self,parent)
		parent:spin();
	end;
};
